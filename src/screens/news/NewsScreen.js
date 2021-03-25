//NewsScreen module

// import packages
import React from 'react';

import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import JobCard from '../../components/JobCard';
import SurveyCard from '../../components/SurveyCard';
import NewsCard from '../../components/NewsCard';
import {colors, spacing, themes, typography} from '../../styles';

//function return
function NewsScreen({navigation}) {
  const theme = themes.light;

  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
      <FocusedStatusBar barStyle="light-content" />

      <ScrollView horizontal={false}>
        <FocusedStatusBar barStyle="light-content" />
        {/* <Text>{JSON.stringify(categories)}</Text> */}

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
          <View style={styles.containerHeading}>
            <Text style={styles.heading}>New Survey</Text>
            <Text>See All</Text>
          </View>
          <SurveyCard surveyText="Aboriginal Peoples Survey Concepts and Methods"></SurveyCard>
        </View>

        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate('News Article')}>
            <NewsCard
              title="North Bay expands it's Education Opportunities for"
              date="Feb 10, 2021"
              details="North Bay Indigenous Friendship Center provides"></NewsCard>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default NewsScreen;

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
