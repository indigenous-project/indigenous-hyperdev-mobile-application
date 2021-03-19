//HomeScreen module

// import packages
import React, {useState, useEffect} from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';
import {categoriesGetList} from '../../api/categories/categories.api';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import EventCard from '../../components/EventCard';
import UpdateCard from '../../components/UpdateCard';
import CategoryButton from '../../components/CategoryButton';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {colors, themes, typography, spacing} from '../../styles';

//function return
function HomeScreen(props) {
  const theme = themes.light;
  const [categories, setCategories] = useState(null);

  // useEffect(() => {
  //   categoriesGetList(
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDQ3YzY4NDkwZTc4MjAwMDdmZjg2ZTEiLCJpYXQiOjE2MTUzMTY2Mjh9.AOe0KoE5MRZN1xw2hMEI3Tq28QPeASkc8BAugpHEChc',
  //   )
  //     .then(setCategories)
  //     .catch(console.log);
  // }, []);

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
              <EventCard
                name="Event 1"
                date="Event Date"
                status="Event status"></EventCard>
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
            <CategoryButton icon="A" name="A category"></CategoryButton>
            <CategoryButton icon="B" name="B category"></CategoryButton>
            <CategoryButton icon="C" name="C category"></CategoryButton>
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
