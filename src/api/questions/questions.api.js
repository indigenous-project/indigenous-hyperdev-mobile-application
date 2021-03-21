// questions.api.js module
// Fetching route questions

import * as environment_variable from '../environment_variable';

// Get a detail of a question: need token, and questionId
export const questionGetDetail = async (token, questionId) => {
  const url = `${environment_variable.BASE_API}/api/questions/detail/${questionId}`;
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

// User participate to a poll
export const questionParticipate = async (token, {questionId, answerId}) => {
  const url = `${environment_variable.BASE_API}/api/poll/participate`;
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({questionId, answerId}),
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
