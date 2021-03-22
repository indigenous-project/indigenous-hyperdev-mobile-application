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
} from 'react-native';
import {colors, themes, typography, spacing} from '../../styles';

//function return
function HomeScreen({navigation}) {
  const theme = themes.light;
  const [categories, setCategories] = useState(null);

  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
      <ScrollView horizontal={false}>
        <FocusedStatusBar barStyle="light-content" />
        {/* <Text>{JSON.stringify(categories)}</Text> */}

        <View style={styles.container}>
          <Text style={styles.heading}>Upcoming Events</Text>
          <View style={styles.upcomingEvent}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <TouchableOpacity onPress={() => navigation.push('Event Detail')}>
                <EventCard
                  name="Event 1"
                  date="Event Date"
                  status="Event status"
                />
              </TouchableOpacity>
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
