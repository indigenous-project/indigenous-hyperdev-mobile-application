import React, {useState, useEffect} from 'react';

import {Alert} from 'react-native';
import {jobGetList} from '../api/jobs/jobs.api';

import {useSecureStorage} from '../hooks/useSecureStorage';

const JobContext = React.createContext();

function JobProvider(props) {
  const [jobs, setJobs] = useState(null);
  const [token, setToken] = useSecureStorage('userToken', '');

  useEffect(() => {
    if (token)
      jobGetList(token)
        .then(setJobs)
        .catch((err) =>
          Alert.alert(err.errors[0].title, err.errors[0].description),
        );
  }, [token, props.isFocused, setJobs]);
  return <JobContext.Provider value={[jobs, setJobs]} {...props} />;
}

function useJob() {
  const context = React.useContext(JobContext);
  if (!context)
    throw new Error('useJob hook must be called within a JobContext');
  return context;
}

export {JobProvider, useJob};
