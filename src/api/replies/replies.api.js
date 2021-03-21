// replies.api.js module
// Fetching route replies

import * as environment_variable from '../environment_variable';

// Post a reply to a discussion thread: need token, body(text) and discussionId
export const repliesAdd = async (token, {text}, discussionId) => {
  const url = `${environment_variable.BASE_API}/api/replies/add/${discussionId}`;
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({text}),
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
