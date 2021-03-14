// posts.api.js module
// Fetching route posts
import * as environment_variable from '../environment_variable';

// Get a list of all posts: need token
export const postGetList = async (token) => {
  const url = `${environment_variable.BASE_API}/api/posts/list`;
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

// Get a single  post: need token and serviceId
export const postGetDetail = async (token, postId) => {
  const url = `${environment_variable.BASE_API}/api/posts/detail/${postId}`;
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

// Dislike a post: token and postId
export const postDislike = async (token, postId) => {
  const url = `${environment_variable.BASE_API}/api/posts/dislike/${postId}`;
  const response = await fetch(url, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      body: JSON.stringify(''),
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

// Like a post: token and postId
export const postLike = async (token, postId) => {
  const url = `${environment_variable.BASE_API}/api/posts/like/${postId}`;
  const response = await fetch(url, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      body: JSON.stringify(''),
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

// count number of sharing a post: token and postId
export const postShare = async (token, postId) => {
  const url = `${environment_variable.BASE_API}/api/posts/share/${postId}`;
  const response = await fetch(url, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      body: JSON.stringify(''),
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
