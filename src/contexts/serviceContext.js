import React, {useState, useEffect} from 'react';

import {Alert} from 'react-native';
import {serviceGetList} from '../api/services/services.api';

import {useSecureStorage} from '../hooks/useSecureStorage';

const ServiceContext = React.createContext();

function ServiceProvider(props) {
  const [services, setServices] = useState(null);
  const [token, setToken] = useSecureStorage('userToken', '');

  useEffect(() => {
    if (token)
      serviceGetList(token)
        .then(setServices, setServices)
        .catch((err) => Alert.alert(err.errors[0]));
  }, [token, props.isFocused]);
  return <ServiceContext.Provider value={[services, setServices]} {...props} />;
}

function useService() {
  const context = React.useContext(ServiceContext);
  if (!context)
    throw new Error('useService hook must be called within a ServiceContext');
  return context;
}

export {ServiceProvider, useService};
