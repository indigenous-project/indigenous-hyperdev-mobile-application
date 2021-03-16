// This is Fetching API for authentification
// auth.api.js

import * as environment_variable from '../environment_variable';

// Fetch API register a new user
export const userSignUp = async (body) => {
  const url = `${environment_variable.BASE_API}/auth/users/signup`;
  body.isAdmin = 'false'; // set user role is not admin
  const response = await fetch(url, {
    method: 'POST',
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

// Fetch a token after user login successfully: email & password
export const userSignIn = async (body) => {
  const url = `${environment_variable.BASE_API}/auth/users/signin`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  // handle errors
  if (!response.ok) {
    return response.json().then((json) => {
      throw json;
    });
  }
  return response.json();
};

// Get a current log-in user: need token
export const userCurrent = async (token) => {
  const url = `${environment_variable.BASE_API}/auth/users/me`;
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

// Logout user
export const userLogout = async (token) => {
  const url = `${environment_variable.BASE_API}/auth/users/logout`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({token: token}),
  });
  // handle errors
  if (!response.ok) {
    return response.json().then((json) => {
      throw json;
    });
  }
  return response.json();
};

// User change password: need oldPassword and newPassword as paramenters
export const userChangePassword = async ({oldPassword, newPassword}, token) => {
  const url = `${environment_variable.BASE_API}/auth/users/managepassword`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({oldPassword, newPassword}),
  });
  // handle errors
  if (!response.ok) {
    return response.json().then((json) => {
      throw json;
    });
  }
  return response.json();
};

// User forgot password: need email, return reset token
export const userForgotPassword = async ({email}) => {
  const url = `${environment_variable.BASE_API}/auth/users/forgotpassword`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email}),
  });
  // handle errors
  if (!response.ok) {
    return response.json().then((json) => {
      throw json;
    });
  }
  return response.json();
};

// User confirm resetpassword
export const userVerifyResetToken = async (token) => {
  const url = `${environment_variable.BASE_API}/auth/users/resetpassword/${token}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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

// User confirm resetpassword: need new password as paramenter
export const userResetPassword = async (body, token) => {
  const url = `${environment_variable.BASE_API}/auth/users/resetpassword/${token}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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
