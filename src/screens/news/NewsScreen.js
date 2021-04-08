//NewsScreen module

// import packages
import React, {useEffect, useState} from 'react';

import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import JobCard from '../../components/JobCard';
import SurveyCard from '../../components/SurveyCard';
import NewsCard from '../../components/NewsCard';
import {colors, spacing, themes, typography} from '../../styles';
import {postGetList} from '../../api/news/news.api';
import {jobGetList} from '../../api/jobs/jobs.api';
import {useCurrentUser} from '../../contexts/currentUserContext';
import {useIsFocused} from '@react-navigation/core';
import {formatDate} from '../../modules/date.format';
import OrganizationChips from '../../components/OrganizationChips';
import {useNews} from '../../contexts/newsContext';
import {surveyGetList} from '../../api/surveys/surveys.api';

//function return
function NewsScreen({navigation}) {
  // State and useState region
  const isFocused = useIsFocused();
  const [filterJobs, setFilterJobs] = useState(null);
  const [filterSurveys, setFilterSurveys] = useState(null);
  const [posts, setPosts] = useNews();
  const [currentUser, token] = useCurrentUser();
  const [refreshing, setRefreshing] = useState(false);
  const [reloadData, setReloadData] = useState(reloadData);
  //End useState region

  //Methods Region
  // wait time for refresh
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  // sort the recent job list by updated Date
  const sortRecentJob = data => {
    let array = data.sort(
      (item1, item2) =>
        parseInt(Date.parse(item2.createdAt), [10]) -
        parseInt(Date.parse(item1.createdAt), [10]),
    );
    setFilterJobs(array); // set Filter jobs
  };

  // sort the recent survey list by updated Date
  const sortRecentSurvey = data => {
    let array = data.sort(
      (item1, item2) =>
        parseInt(Date.parse(item2.createdAt), [10]) -
        parseInt(Date.parse(item1.createdAt), [10]),
    );
    setFilterSurveys(array); // set Filter jobs
  };

  // Converting cents to dollars
  const convertSalary = data => {
    var dollars = data / 100;
    dollars = dollars.toLocaleString('en-US', {
      style: 'currency',
      currency: 'CAD',
    });
    return dollars;
  };

  //handle on refresh
  const onRefresh = () => {
    setRefreshing(true); // enable refresh indicator
    setReloadData(!reloadData); // change the reloadData to re-render new Discussion
    wait(1500).then(() => setRefreshing(false)); // hide refresh indicator
  };

  // useEffectRegion
  // useEffect load job list
  useEffect(() => {
    jobGetList(token)
      .then(response => {
        sortRecentJob(response);
      })

      .catch(err => {
        Alert.alert(err.errors[0].title, err.errors[0].description);
      });
  }, [token, reloadData, isFocused]);

  // useEffect load post list
  useEffect(() => {
    postGetList(token)
      .then(response => {
        setPosts(response);
      })

      .catch(err => {
        Alert.alert(err.errors[0].title, err.errors[0].description);
      });
  }, [token, reloadData, isFocused]);

  // useEffect load survey list
  useEffect(() => {
    if (token && isFocused)
      surveyGetList(token)
        .then(response => {
          sortRecentSurvey(response);
        })

        .catch(err =>
          Alert.alert(err.errors[0].title, err.errors[0].description),
        );
  }, [token, isFocused]);
  // End useEffectRegion

  // Render element
  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
      <FocusedStatusBar barStyle="light-content" />

      {/* Adding Refresh control to the news screen */}
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

        {/* Extracting the data from the job array and displaying the required elements */}
        {filterJobs ? (
          <View style={styles.container}>
            <View style={styles.containerHeading}>
              <Text style={styles.heading}>Job News</Text>
              <Text onPress={() => navigation.navigate('Jobs List')}>
                See All
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Job Detail', {
                  job: filterJobs[0],
                  jobId: filterJobs[0]._id,
                  token: token,
                })
              }
              key={filterJobs[0]._id}>
              <JobCard
                title={filterJobs[0].title}
                posting={filterJobs[0].subTitle}
                type={filterJobs[0].type}
                salary={convertSalary(filterJobs[0].salary)}></JobCard>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Extracting the data from the survey array and displaying the required elements */}
        {filterSurveys ? (
          <View style={styles.container}>
            <View style={styles.containerHeading}>
              <Text style={styles.heading}>New Survey</Text>

              <Text onPress={() => navigation.navigate('Surveys')}>
                See All
              </Text>
            </View>
            <SurveyCard
              title={filterSurveys[0].title}
              key={filterSurveys[0]._id}
              link={filterSurveys[0].link}
            />
          </View>
        ) : null}

        {/* Extracting the data from the news array and displaying the required elements */}
        <View style={styles.container}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <OrganizationChips category="Categories" />
            <OrganizationChips category="Most-Read" />
            <OrganizationChips category="Recent" />
            <OrganizationChips category="Indigenous" />
          </ScrollView>
          {posts
            ? posts.map(post => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('News Article', {
                      postId: post._id,
                      token: token,
                    })
                  }
                  key={post._id}>
                  <NewsCard
                    title={post.title}
                    date={formatDate(post.lastModifiedDate)}
                    details={post.description}
                  />
                </TouchableOpacity>
              ))
            : null}
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
    padding: spacing.base,
    backgroundColor: colors.white,
    marginTop: spacing.small,
  },
  heading: {
    color: colors.primary900,
    fontWeight: typography.fwBold,
    fontSize: typography.fs3,
  },
  containerHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    marginRight: spacing.small,
  },
});
