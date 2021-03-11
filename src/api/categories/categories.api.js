// categories.api.js module
// Fetching route categories

import * as environment_variable from '../environment_variable';

// Get a list of all categories: need token
export const categoriesGetList = async (token) => {
  const url = `${environment_variable.BASE_API}/api/categories/list`;
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  // handle errors
  if (!response.ok) {
    return response.json().then((json) => {
      throw json;
    });
  }
  return response.json();
};
