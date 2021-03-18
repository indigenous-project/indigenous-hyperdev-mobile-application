import React, {useState, useEffect} from 'react';

import {Alert} from 'react-native';
import {discussionGetList} from '../api/discussions/discussions.api';
import {useSecureStorage} from '../hooks/useSecureStorage';

const DiscussionContext = React.createContext();

function DiscussionProvider(props) {
  const [discussions, setDiscussions] = useState(null);
  const [token, setToken] = useSecureStorage('userToken', '');

  useEffect(() => {
    if (token)
      discussionGetList(token)
        .then(setDiscussions)
        .catch((err) => Alert.alert(err.errors[0]));
  }, [token, props.isFocused]);
  return <DiscussionContext.Provider value={[discussions]} {...props} />;
}

function useDiscussion() {
  const context = React.useContext(DiscussionContext);
  if (!context)
    throw new Error(
      'useDiscussion hook must be called within a DiscussionContext',
    );
  return context;
}

export {DiscussionProvider, useDiscussion};
