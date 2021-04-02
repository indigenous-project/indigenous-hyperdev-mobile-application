//HomeScreen module

// import packages
import React, { useState, useEffect } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { categoriesGetList } from '../../api/categories/categories.api';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import EventCard from '../../components/EventCard';
import UpdateCard from '../../components/UpdateCard';
import ServicesCategoryButton from '../../components/ServicesCategoryButton';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { colors, themes, typography, spacing } from '../../styles';
import { useCurrentUser } from '../../contexts/currentUserContext';
import { eventGetList } from '../../api/events/events.api';
import { latestUpdateGet } from '../../api/latestUpdate/latestUpdate.api';
import { useIsFocused } from '@react-navigation/core';
// End import region

//function return
function HomeScreen({ navigation }) {
  // State and useState region
  const theme = themes.light;
  const isFocused = useIsFocused();
  const [categories, setCategories] = useState(null);
  const [latestUpdate, setLatestUpdate] = useState(null);
  const [events, setEvents] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [reloadData, setReloadData] = useState(false);
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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Services and Programs', {
                  name: 'Culture',
                  token: token,
                });
              }}>
              <ServicesCategoryButton
                icon="https://indigenous-images.s3.amazonaws.com/cultureIcon.png"
                name="Culture"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Services and Programs', {
                  name: 'Government/Legal',
                  token: token,
                });
              }}>
              <ServicesCategoryButton
                icon="https://indigenous-images.s3.amazonaws.com/legalIcon.png"
                name="Government/Legal"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Services and Programs', {
                  name: 'Mental Health/Addiction',
                  token: token,
                });
              }}>
              <ServicesCategoryButton
                icon="https://indigenous-images.s3.amazonaws.com/hospitalIcon.png"
                name="Mental Health/Addiction"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  //container style
  container: {
    alignItems: 'flex-start',
    padding: spacing.small,
    backgroundColor: colors.white,
    marginTop: spacing.small,
  },
  heading: {
    color: colors.primary900,
    paddingLeft: spacing.small,
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
    marginHorizontal: spacing.smallest,
    marginVertical: spacing.small,
    backgroundColor: colors.white,
    shadowColor: colors.gray900,
    shadowOffset: { width: 3, height: 6 },
    shadowOpacity: 0.2,
    width: '100%',
  },

  //styling for popular service categories
  popularServices: {
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: spacing.small,
    backgroundColor: colors.white,
  },
});

export default HomeScreen;
