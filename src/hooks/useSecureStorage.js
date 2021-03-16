import {useEffect, useState} from 'react';
import * as SecureStorage from 'expo-secure-store';
import {Alert} from 'react-native';

export function useSecureStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue);
  useEffect(() => {
    SecureStorage.getItemAsync(key)
      .then((value) => {
        if (value === null) return initialValue;
        return JSON.parse(value);
      })
      .then(setStoredValue)
      .catch(Alert.alert);
  }, [key, initialValue]);

  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    SecureStorage.setItemAsync(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue];
}

export function deleteItemAsync(key) {
  SecureStorage.deleteItemAsync(key);
}
