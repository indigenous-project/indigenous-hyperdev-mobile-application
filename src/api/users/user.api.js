// user.api.js

import * as environment_variable from '../environment_variable';

// Edit user detail
export const userEdit = async (userId, body) => {
  const url = `${environment_variable.BASE_API}/auth/users/edit/${userId}`;
  body.isAdmin = false; // set user role is not admin
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(body),
  });
  if (!response.ok) {
    return response.json().then((json) => {
      throw json;
    });
  }
  return response.json();
};
