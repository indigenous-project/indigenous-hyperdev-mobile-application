import React, {useState, useEffect} from 'react';

import {Alert} from 'react-native';
import {postGetList} from '../api/news/news.api';

import {useSecureStorage} from '../hooks/useSecureStorage';

const NewsContext = React.createContext();

function NewsProvider(props) {
  const [news, setNews] = useState(null);
  const [token, setToken] = useSecureStorage('userToken', '');

  useEffect(() => {
    if (token)
      postGetList(token)
        .then(setNews)
        .catch((err) =>
          Alert.alert(err.errors[0].title, err.errors[0].description),
        );
  }, [token, props.isFocused, setNews]);
  return <NewsContext.Provider value={[news, setNews]} {...props} />;
}

function useNews() {
  const context = React.useContext(NewsContext);
  if (!context)
    throw new Error('useNews hook must be called within a NewsContext');
  return context;
}

export {NewsProvider, useNews};
