import React, {useState, useEffect} from 'react';

import {Alert} from 'react-native';
import {categoriesGetList} from '../api/categories/categories.api';

import {useSecureStorage} from '../hooks/useSecureStorage';

const CategoriesGeneralContext = React.createContext();

function CategoriesGeneralProvider(props) {
  const [categories, setCategories] = useState();
  const [token, setToken] = useSecureStorage('userToken', '');

  useEffect(() => {
    if (token)
      categoriesGetList(token)
        .then((response) => setCategories(response))
        .catch((err) => Alert.alert(err.errors[0].title));
  }, [token]);
  return <CategoriesGeneralContext.Provider value={[categories]} {...props} />;
}

function useCategoryGeneral() {
  const context = React.useContext(CategoriesGeneralContext);
  if (!context)
    throw new Error(
      'useCurrentUSer hook must be called within a CategoriesGeneralContext',
    );
  return context;
}

export {CategoriesGeneralProvider, useCategoryGeneral};
