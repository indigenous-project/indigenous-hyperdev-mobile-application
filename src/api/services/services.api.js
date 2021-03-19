// services.api.js module
// Fetching route services
import * as environment_variable from '../environment_variable';

// Get a list of all services: need token
export const serviceGetList = async (token) => {
  const url = `${environment_variable.BASE_API}/api/services/list`;
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

// Get a single  service: need token and serviceId
export const serviceGetDetail = async (token, serviceId) => {
  const url = `${environment_variable.BASE_API}/api/services/detail/${serviceId}`;
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
