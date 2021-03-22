// media.api.js module
// Fetching route discussions

import * as environment_variable from '../environment_variable';

// Add a media by user: need token and body(path, extension, type)
export const mediaAddImage = async (token, body) => {
  const url = `${environment_variable.BASE_API}/api/medias/add`;
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
