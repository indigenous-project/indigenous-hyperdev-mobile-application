//HomeScreen module

// import packages
import React, {useState, useEffect} from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';
import {categoriesGetList} from '../../api/categories/categories.api';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import EventCard from '../../components/EventCard';
import UpdateCard from '../../components/UpdateCard';
import CategoryButton from '../../components/CategoryButton';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import {colors, themes, typography, spacing} from '../../styles';
import {useCurrentUser} from '../../contexts/currentUserContext';
import {eventGetList} from '../../api/events/events.api';
// End import region

//function return
function HomeScreen({navigation}) {
  // State and useState region
  const theme = themes.light;
  const [categories, setCategories] = useState(null);
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
    const year = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(date);
    const month = new Intl.DateTimeFormat('en', {month: 'short'}).format(date);
    const day = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(date);
    const weekday = new Intl.DateTimeFormat('en', {weekday: 'long'}).format(
      date,
    );

    return `${weekday.toUpperCase()}, ${month} ${day}, ${year}`;
  };

  //End Methods region

  //useEffectRegion
  useEffect(() => {
    if (token)
      eventGetList(token)
        .then(setEvents)
        .catch((err) =>
          Alert.alert(err.errors[0].title, err.errors[0].description),
        );
  }, [token, reloadData]);
  // End useEffect Region

  console.log(events);
  // Render element
  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
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
                      onPress={() => navigation.push('Event Detail')}>
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
            <UpdateCard
              title="Title of Update"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud"></UpdateCard>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.heading}>Popular Service Category</Text>
          <View style={styles.popularServices}>
            <CategoryButton
              icon="https://indigenous-images.s3.amazonaws.com/cultureIcon.png"
              name="Culture"
            />
            <CategoryButton
              icon="https://indigenous-images.s3.amazonaws.com/legalIcon.png"
              name="Government/ Legal"
            />
            <CategoryButton
              icon="https://indigenous-images.s3.amazonaws.com/hospitalIcon.png"
              name="Mental Health/ Addiction"
            />
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
    shadowOffset: {width: 3, height: 6},
    shadowOpacity: 0.2,
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
