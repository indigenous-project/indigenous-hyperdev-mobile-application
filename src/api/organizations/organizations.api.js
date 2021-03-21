// organizations.api.js module
// Fetching route organizations
import * as environment_variable from '../environment_variable';

// Get a list of all organizations: need token
export const organizationGetList = async (token) => {
  const url = `${environment_variable.BASE_API}/api/centers/list`;
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

// Get a single  organization: need token and organizationId
export const organizationGetDetail = async (token, organizationId) => {
  const url = `${environment_variable.BASE_API}/api/centers/detail/${organizationId}`;
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

// /Update a review to organization: need token, reviews: [{score: 0}]) and organizationId
export const organizationReview = async (token, {reviews}, organizationId) => {
  const url = `${environment_variable.BASE_API}/api/centers/review/${organizationId}`;
  const response = await fetch(url, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({reviews}),
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
