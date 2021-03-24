// events api module
// Fetch event api

// events.api.js module
// Fetching route events
import * as environment_variable from '../environment_variable';

// Get a list of all events: need token
export const eventGetList = async (token) => {
  const url = `${environment_variable.BASE_API}/api/events/list`;
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

// Get a single  event: need token and eventId
export const eventGetDetail = async (token, eventId) => {
  const url = `${environment_variable.BASE_API}/api/events/detail/${eventId}`;
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

// increase interested count
export const eventInterested = async (token, eventId) => {
  const url = `${environment_variable.BASE_API}/api/events/interested/${eventId}`;
  const response = await fetch(url, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(''),
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

// increase goingcount
export const eventGoing = async (token, eventId) => {
  const url = `${environment_variable.BASE_API}/api/events/going/${eventId}`;
  const response = await fetch(url, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(''),
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

// increase goingcount
export const eventShare = async (token, eventId) => {
  const url = `${environment_variable.BASE_API}/api/events/share/${eventId}`;
  const response = await fetch(url, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(''),
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
