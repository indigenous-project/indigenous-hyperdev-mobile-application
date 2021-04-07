//HomeScreen module

// import packages
import React, { useState, useEffect } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { categoriesGetList } from '../../api/categories/categories.api';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import EventCard from '../../components/EventCard';
import UpdateCard from '../../components/UpdateCard';
import ServicesCard from '../../components/ServicesCard';
import { serviceGetList } from '../../api/services/services.api';
import ServicesCategoryButton from '../../components/ServicesCategoryButton';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Modal,
  Pressable
} from 'react-native';
import { colors, themes, typography, spacing } from '../../styles';
import { useCurrentUser } from '../../contexts/currentUserContext';
import { eventGetList } from '../../api/events/events.api';
import { latestUpdateGet } from '../../api/latestUpdate/latestUpdate.api';
import { useIsFocused } from '@react-navigation/core';
import { useEvent } from '../../contexts/eventContext';
// End import region

//function return
function HomeScreen({ navigation }) {
  // State and useState region
  const theme = themes.light;
  const isFocused = useIsFocused();
  const [categories, setCategories] = useState(null);
  const [latestUpdate, setLatestUpdate] = useState(null);
  const [selectedServiceCategory, setSelectedServiceCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useEvent(); // use event context
  const [refreshing, setRefreshing] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [services, setServices] = useState(null);
  const [currentUser, token] = useCurrentUser();
  //End useState region

  //Methods Region
  // wait time for refresh
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  //handle on refresh
  const onRefresh = () => {
    setRefreshing(true); // enable refresh indicator
    setReloadData(!reloadData); // change the reloadData to re-render new Discussion
    wait(1500).then(() => setRefreshing(false)); // hide refresh indicator
  };

  // function format date: Example Jan 30th, 2021
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    const weekday = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(
      date,
    );

    return `${weekday.toUpperCase()}, ${month} ${day}, ${year}`;
  };

  //End Methods region

  //useEffectRegion
  useEffect(() => {
    // fetching events
    if (token && isFocused)
      eventGetList(token)
        .then(setEvents)
        .catch((err) =>
          Alert.alert(err.errors[0].title, `${err.errors[0].description}`),
        );
  }, [token, reloadData, isFocused]);

  useEffect(() => {
    if (token && isFocused)
      latestUpdateGet(token)
        .then(setLatestUpdate)
        .catch((err) =>
          Alert.alert(err.errors[0].title, err.errors[0].description),
        );
  }, [token, reloadData, isFocused]);

  // useEffect load  new category list
  useEffect(() => {
    if (token && isFocused)
      categoriesGetList(token)
        .then((response) => {
          if (response) {
            setCategories(response);
          }
        })

        .catch((err) => {
          Alert.alert(err.errors[0].title, err.errors[0].description);
        });
  }, [token, reloadData, isFocused]);

  useEffect(() => {
    if (token && isFocused)
      serviceGetList(token)
        .then(setServices)
        .catch((err) =>
          Alert.alert(err.errors[0].title, err.errors[0].description),
        );
  }, [token, reloadData, isFocused]);
  // End useEffect Region

  // Render element
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['right', 'left']}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary900}
          />
        }
        horizontal={false}>
        <FocusedStatusBar barStyle="light-content" />
        {/* <Text>{JSON.stringify(categories)}</Text> */}

        <View style={styles.container}>
          <Text style={styles.heading}>Upcoming Events</Text>
          <View style={styles.upcomingEvent}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {events
                ? events.map((event) => (
                  <TouchableOpacity
                    key={event._id}
                    onPress={() =>
                      navigation.navigate('EventDetail', { eventId: event._id })
                    }>
                    <EventCard
                      image={event.medias[0].path}
                      name={event.title}
                      date={formatDate(event.date)}
                      status={`${event.interestedUsers.length} Interested | ${event.goingUsers.length} Going`}
                    />
                  </TouchableOpacity>
                ))
                : null}
            </ScrollView>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.heading}>Latest Update</Text>
          <View style={styles.latestUpdate}>
            {latestUpdate ? (
              <UpdateCard
                title={latestUpdate.title}
                description={latestUpdate.description}
              />
            ) : null}
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.heading}>Popular Service Category</Text>
          <View style={styles.popularServices}>
            {categories
              ? categories.slice(1, 4).map((category) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedServiceCategory(category);
                    setModalVisible(true);
                  }} key={category._id}>
                  <ServicesCategoryButton
                    icon={category.icon}
                    name={category.name}
                  />
                </TouchableOpacity>
              ))
              : null}

          </View>
        </View>
      </ScrollView>

      {selectedServiceCategory ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalView} key={selectedServiceCategory._id}>
            <View style={styles.modalTitle}>
              <View>
                <Text style={styles.modalTitleText}>
                  {selectedServiceCategory.name}
                </Text>
              </View>

              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(!modalVisible)}
                key={selectedServiceCategory._id}>
                <Text style={styles.buttonText}>x</Text>
              </Pressable>
            </View>

            <View style={{ padding: spacing.base }}>
              <Text style={styles.heading} >Services and Programs</Text>
              {services.filter((service) => {
                return service.category.name === selectedServiceCategory.name;
              }).map((service) => (
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible)
                    navigation.navigate('Service Detail', {
                      name: service,
                      token: token,
                    });
                  }} key={service._id} >
                  <ServicesCard
                    title={service.name}
                    name={service.contact.providerName}
                    position={service.contact.position}
                    isIndigenous={service.isIndigenous}
                  />
                </TouchableOpacity>
              ))
              }
            </View>
          </View>
        </Modal>
      ) : null
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  //container style
  container: {
    alignItems: 'flex-start',
    padding: spacing.base,
    backgroundColor: colors.white,
    marginTop: spacing.small,
  },
  heading: {
    color: colors.primary900,
    fontWeight: typography.fwBold,
    fontSize: typography.fs3,
  },

  //styling for upcoming event
  upcomingEvent: {
    flexDirection: 'row',
  },

  //styling for latest update
  latestUpdate: {
    borderRadius: spacing.small,
    marginTop: spacing.small,
    backgroundColor: colors.white,
    shadowOffset: {
      width: spacing.none,
      height: spacing.smallest,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 7,
  },

  //styling for popular service categories
  popularServices: {
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: spacing.small,
    backgroundColor: colors.white,
  },

  //styling for modal container
  modalView: {
    marginTop: 50,
    backgroundColor: colors.white,
    borderRadius: 20,
    height: '100%',
  },
  modalTitle: {
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.base,
    flexDirection: 'row',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderBottomColor: colors.gray900,
    borderBottomWidth: 0.3,
  },
  modalTitleText: {
    fontSize: typography.fs4,
    color: colors.primary900,
    fontWeight: typography.fwBold,
    paddingTop: spacing.smallest,
  },
  closeButton: {
    width: 25,
    height: 25,
    alignItems: 'center',
    shadowOffset: { width: 3, height: 3 },
    shadowColor: colors.gray900,
    shadowOpacity: 0.2,
    borderRadius: 100,
    backgroundColor: colors.primary50,
  },
  buttonText: {
    color: colors.primary900,
    fontSize: 20,
    fontWeight: typography.fwMedium,
  },
});

export default HomeScreen;