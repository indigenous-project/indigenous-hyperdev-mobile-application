// latestUpdate.api.js module
// Fetching route latestUpdate

import * as environment_variable from '../../../environment_variable.js';

// Get a list of all categories: need token
export const latestUpdateGet = async (token) => {
  const url = `${environment_variable.BASE_API}/api/latestUpdate/latest`;
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
  const {data} = await response.json();
  return data;
};
