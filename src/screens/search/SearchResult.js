import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {themes, colors, spacing, typography} from '../../styles';
import SearchBar from '../../components/SearchBar';
import JobCard from '../../components/JobCard';
import NewsCard from '../../components/NewsCard';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import ServicesProgramCard from '../../components/ServicesProgramCard';

function SearchResult(props) {
  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
      <View
        style={{
         width: '100%',
          borderRadius: spacing.small,
        }}>
        <SearchBar placeholder="Employment" />
      </View>
      <FocusedStatusBar barStyle="light-content" />

      <ScrollView horizontal={false}>
        <FocusedStatusBar barStyle="light-content" />
        {/* <Text>{JSON.stringify(categories)}</Text> */}

        <View style={{paddingTop: spacing.small}}>
          <ServicesProgramCard
            category="Services And Programs"
            title="Title"
            name="Name"
            description="Description"
          />
          <FocusedStatusBar barStyle="light-content" />
        </View>

        <View style={styles.container}>
          <View style={styles.containerHeading}>
            <Text style={styles.heading}>Job News</Text>
            <Text>See All</Text>
          </View>
          <View style={styles.jobNews}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <JobCard
                title="Job Title"
                posting="Job Posting"
                type="Job Type"
                salary="Job Salary"></JobCard>
            </ScrollView>
          </View>
        </View>
        <View style={styles.container}>
          <NewsCard
            title="North Bay expands its Education Opportunities for"
            date="Feb 10, 2021"
            details="North Bay Indigenous Friendship Center provides"></NewsCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SearchResult;

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
  containerHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    marginRight: spacing.small,
  },

  //job card styles
  jobNews: {
    flexDirection: 'row',
  },
});
