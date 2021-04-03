import React, {useState, useEffect} from 'react';

import {Alert} from 'react-native';
import {userCurrent} from '../api/auth/auth.api';
import {useSecureStorage} from '../hooks/useSecureStorage';

const CurrentUserContext = React.createContext();

function CurrentUserProvider(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useSecureStorage('userToken', '');

  useEffect(() => {
    if (token)
      userCurrent(token)
        .then(setCurrentUser)
        .catch((err) => Alert.alert(err.errors[0]));
  }, [token, setCurrentUser]);
  return (
    <CurrentUserContext.Provider
      value={[currentUser, token, setCurrentUser]}
      {...props}
    />
  );
}

function useCurrentUser() {
  const context = React.useContext(CurrentUserContext);
  if (!context)
    throw new Error(
      'useCurrentUSer hook must be called within a CurrentUserContext',
    );
  return context;
}

export {CurrentUserProvider, useCurrentUser};
