// comments.api.js module
// Fetching route comments

import * as environment_variable from '../environment_variable';

// Add a comment by user: need center/ Services id , type of comment: posts/ center, and text as content
export const commentsAdd = async (token, {text}, {id, type}) => {
  const url = `${environment_variable.BASE_API}/api/comments/list/${id}/${type}`;
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      body: JSON.stringify({text}),
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

// Delete a comment by user: need center/ Services id , type of comment: posts/ center, and text as content
export const commentsDelete = async (token, commentId) => {
  const url = `${environment_variable.BASE_API}/api/comments/delete/${commentId}`;
  const response = await fetch(url, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({isDelete: true}),
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
