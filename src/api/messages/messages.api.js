// messages.api.js module
// Fetching route messages
import * as environment_variable from '../../../environment_variable.js';

// Get a detail of a question: need token, text of message as body
export const messageAdd = async (token, body) => {
  const url = `${environment_variable.BASE_API}/api/messages/add`;
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
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

// Get all messages: need token, {senderId, receiverId}
export const messageGetList = async (token, {senderId}) => {
  const url = `${environment_variable.BASE_API}/api/messages/list/${senderId}/admin`;
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
