import React, {useState, useEffect} from 'react';

import {Alert} from 'react-native';

import {eventGetList} from '../api/events/events.api';
import {useSecureStorage} from '../hooks/useSecureStorage';

const EventContext = React.createContext();

function EventProvider(props) {
  const [events, setEvents] = useState(null);
  const [token, setToken] = useSecureStorage('userToken', '');

  useEffect(() => {
    if (token)
      eventGetList(token)
        .then(setEvents)
        .catch((err) => Alert.alert(err.errors[0]));
  }, [token, props.isFocused]);
  return <EventContext.Provider value={[events]} {...props} />;
}

function useEvent() {
  const context = React.useContext(EventContext);
  if (!context)
    throw new Error('useEvent hook must be called within a Eventcontext');
  return context;
}

export {EventProvider, useEvent};
