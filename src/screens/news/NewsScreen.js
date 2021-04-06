//NewsScreen module

// import packages
import React, { useEffect, useState } from 'react';

import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import JobCard from '../../components/JobCard';
import SurveyCard from '../../components/SurveyCard';
import NewsCard from '../../components/NewsCard';
import { colors, spacing, themes, typography } from '../../styles';
import { postGetList } from '../../api/news/news.api';
import { jobGetList } from '../../api/jobs/jobs.api';
import { useCurrentUser } from '../../contexts/currentUserContext';
import { useIsFocused } from '@react-navigation/core';
import { formatDate } from '../../modules/date.format';
import OrganizationChips from '../../components/OrganizationChips';
import { useJob } from '../../contexts/jobContext';
import { useNews } from '../../contexts/newsContext';

//function return
function NewsScreen({ navigation }) {
  const theme = themes.light;
  const isFocused = useIsFocused();
  //const [jobs, setJobs] = useState(null);
  //const [posts, setPosts] = useState(null);
  const [jobs, setJobs] = useJob();
  const [posts, setPosts] = useNews();
  const [currentUser, token] = useCurrentUser();
  const [refreshing, setRefreshing] = useState(false);
  const [reloadData, setReloadData] = useState(reloadData);

  //Methods Region
  // wait time for refresh
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  // Converting cents to dollars
  const convertSalary = (data) => {
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

  // useEffect load job list
  useEffect(() => {
    jobGetList(token)
      .then((response) => {
        setJobs(response);
      })

      .catch((err) => {
        Alert.alert(err.errors[0].title, err.errors[0].description);
      });
  }, [token, reloadData, isFocused]);

  // useEffect load post list
  useEffect(() => {
    postGetList(token)
      .then((response) => {
        setPosts(response);
      })

      .catch((err) => {
        Alert.alert(err.errors[0].title, err.errors[0].description);
      });
  }, [token, reloadData, isFocused]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['right', 'left']}>
      <FocusedStatusBar barStyle="light-content" />

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

        {jobs
          ?
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
                  job: jobs[0],
                  jobId: jobs[0]._id,
                  token: token,
                })
              }
              key={jobs[0]._id}>
              <JobCard
                title={jobs[0].title}
                posting={jobs[0].subTitle}
                type={jobs[0].type}
                salary={convertSalary(jobs[0].salary)}></JobCard>
            </TouchableOpacity>
          </View>
          : null}

        <View style={styles.container}>
          <View style={styles.containerHeading}>
            <Text style={styles.heading}>New Survey</Text>
            <Text onPress={() => navigation.navigate('Surveys')}>
              See All
            </Text>
          </View>

          <SurveyCard title="Aborginal Peoples Survey Concepts and Methods" />
        </View>

        <View style={styles.container}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <OrganizationChips category="Categories" />
            <OrganizationChips category="Most-Read" />
            <OrganizationChips category="Recent" />
            <OrganizationChips category="Indigenous" />
          </ScrollView>
          {posts
            ? posts.map((post) => (
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
                  details={post.description} />
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
