import * as environment_variable from '../../../environment_variable.js';

export const surveyGetList = async (token) => {
    const url = `${environment_variable.BASE_API}/api/surveys/list`;
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
  