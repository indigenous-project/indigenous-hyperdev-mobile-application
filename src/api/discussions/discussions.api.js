// discussions.api.js module
// Fetching route discussions

import * as environment_variable from '../environment_variable';

// Add a discussion by user: need token and body(title, [categoriesId], description)
export const discussionAdd = async (token, body) => {
  const url = `${environment_variable.BASE_API}/api/discussions/add`;
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      body: JSON.stringify(body),
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

// Get a single discussion by user: need token and discussionId
export const discussionGetDetail = async (token, discussionId) => {
  const url = `${environment_variable.BASE_API}/api/discussions/detail/${discussionId}`;
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

// Get a single discussion by user: need token and discussionId
export const discussionGetList = async (token, body) => {
  const url = `${environment_variable.BASE_API}/api/discussions/list`;
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

// Edit a discussion by user: need token and discussionId
export const discussionEdit = async (token, body, discussionId) => {
  const url = `${environment_variable.BASE_API}/api/discussions/edit/${discussionId}`;
  const response = await fetch(url, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      body: JSON.stringify(body),
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
