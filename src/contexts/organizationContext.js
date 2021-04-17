import React, {useState, useEffect} from 'react';

import {Alert} from 'react-native';
import {organizationGetList} from '../api/organizations/organizations.api';

import {useSecureStorage} from '../hooks/useSecureStorage';

const OrganizationContext = React.createContext();

function OrganizationProvider(props) {
  const [organization, setOrganizations] = useState(null);
  const [token, setToken] = useSecureStorage('userToken', '');

  useEffect(() => {
    if (token)
      organizationGetList(token)
        .then(setOrganizations)
        .catch((err) =>
          Alert.alert(err.errors[0].title, err.errors[0].description),
        );
  }, [token, props.isFocused, setOrganizations]);
  return (
    <OrganizationContext.Provider
      value={[organization, setOrganizations]}
      {...props}
    />
  );
}

function useOrganization() {
  const context = React.useContext(OrganizationContext);
  if (!context)
    throw new Error(
      'useOrganization hook must be called within a OrganizationContext',
    );
  return context;
}

export {OrganizationProvider, useOrganization};
