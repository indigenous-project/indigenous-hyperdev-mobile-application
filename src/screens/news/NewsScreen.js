//NewsScreen module

// import packages
import React, {useEffect, useState} from 'react';

import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {SafeAreaView} from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import JobCard from '../../components/JobCard';
import SurveyCard from '../../components/SurveyCard';
import NewsCard from '../../components/NewsCard';
import {colors, spacing, themes, typography} from '../../styles';

import {postGetList} from '../../api/news/news.api';
import {jobGetList} from '../../api/jobs/jobs.api';
import {surveyGetList} from '../../api/surveys/surveys.api';
import {useCurrentUser} from '../../contexts/currentUserContext';
import {useIsFocused} from '@react-navigation/core';

//function return
function NewsScreen({navigation}) {
  const theme = themes.light;
  const isFocused = useIsFocused();
  const [jobs, setJobs] = useState(null);
  const [posts, setPosts] = useState(null);
  const [surveys, setSurveys] = useState(null);
  const [currentUser, token] = useCurrentUser();
  const [refreshing, setRefreshing] = useState(false);
  const [reloadData, setReloadData] = useState(reloadData);

  //handle on refresh
  const onRefresh = () => {
    setRefreshing(true); // enable refresh indicator
    setReloadData(!reloadData); // change the reloadData to re-render new Discussion
    wait(1500).then(() => setRefreshing(false)); // hide refresh indicator
  };

  // function format date: Example Jan 30th, 2021
  const formatDate = dateString => {
    const date = new Date(dateString);
    const year = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(date);
    const month = new Intl.DateTimeFormat('en', {month: 'short'}).format(date);
    const day = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(date);
    const weekday = new Intl.DateTimeFormat('en', {weekday: 'long'}).format(
      date,
    );

    return `${weekday.toUpperCase()}, ${month} ${day}, ${year}`;
  };

  // useEffect load  new news list
  useEffect(() => {
    jobGetList(token)
      .then(response => {
        setJobs(response);
      })

      .catch(err => {
        Alert.alert(err.errors[0].title, err.errors[0].description);
      });
  }, [token, reloadData, isFocused]);

  useEffect(() => {
    postGetList(token)
      .then(response => {
        setPosts(response);
      })

      .catch(err => {
        Alert.alert(err.errors[0].title, err.errors[0].description);
      });
  }, [token, reloadData, isFocused]);

  useEffect(() => {
    surveyGetList(token)
      .then(response => {
        setSurveys(response);
      })

      .catch(err => {
        Alert.alert(err.errors[0].title, err.errors[0].description);
      });
  }, [token, reloadData, isFocused]);

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
              {jobs
                ? jobs.map(job => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Job Detail', {
                          jobId: job._id,
                          token: token,
                        })
                      }
                      key={job._id}>
                      <JobCard
                        title={job.title}
                        posting={job.subTitle}
                        type={job.type}
                        salary={job.salary}></JobCard>
                    </TouchableOpacity>
                  ))
                : null}
            </ScrollView>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.containerHeading}>
            <Text style={styles.heading}>New Survey</Text>
            <Text>See All</Text>
          </View>
          {surveys ? (
            <SurveyCard surveyText={surveys.title}></SurveyCard>
          ) : null}
        </View>

        <View style={styles.container}>
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
                    details={post.details}></NewsCard>
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
