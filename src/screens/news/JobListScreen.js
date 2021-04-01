import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useIsFocused} from '@react-navigation/core';
import {useCurrentUser} from '../../contexts/currentUserContext';
import {jobGetList} from '../../api/jobs/jobs.api';
import JobListCard from '../../components/JobListCard';

const JobListScreen = ({navigation}) => {
  const [jobs, setJobs] = useState(null);
  const [currentUser, token] = useCurrentUser();
  const isFocused = useIsFocused();

  // Converting cents to dollars
  const convertSalary = data => {
    var dollars = data / 100;
    dollars = dollars.toLocaleString('en-US', {
      style: 'currency',
      currency: 'CAD',
    });
    return dollars;
  };

  // useEffect load job list
  useEffect(() => {
    jobGetList(token)
      .then(response => {
        setJobs(response);
      })

      .catch(err => {
        Alert.alert(err.errors[0].title, err.errors[0].description);
      });
  }, [token, isFocused]);
  return (
    <View>
      {jobs
        ? jobs.map(job => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Job Detail', {
                  job: job,
                  jobId: job._id,
                  token: token,
                })
              }
              key={job._id}>
              <JobListCard
                title={job.title}
                posting={job.subTitle}
                type={job.type}
                salary={convertSalary(job.salary)}></JobListCard>
            </TouchableOpacity>
          ))
        : null}
    </View>
  );
};

export default JobListScreen;
