import axios from 'axios';
import { browserHistory } from 'react-router';

/* —---------------— GET ID TOKEN —---------------— */
// this function returns the id token of the logged user

export function getIdToken() {
  const idToken = localStorage.getItem('idToken');
  if (idToken === undefined) {
    return console.log('Error: id token is missing'); // eslint-disable-line no-console
  }
  return idToken;
}

/* —---------------— GET ORIGIN URL —---------------— */
// this function returns the origin url of the logged user

export function getOriginUrl() {
  const originUrl = window.location.origin;
  if (!originUrl) {
    return console.log('Error: origin url is missing'); // eslint-disable-line no-console
  }
  return originUrl;
}

/* —---------------— CHECK TOKEN —---------------— */
// this function checks the current token and handles login redirect

export function requireToken() {
  if (!window.localStorage.getItem('idToken') ||
    !window.localStorage.getItem('profileType')) {
    browserHistory.replace({ pathname: '/login' });
  } else {
    const originUrl = window.location.origin;
    axios.get(`${originUrl}/api/v1/cameras`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('idToken')}`,
      },
    })
      .catch(() => {
        window.localStorage.setItem('idToken', '');
        window.localStorage.setItem('profileType', '');
        browserHistory.replace({ pathname: '/login' });
      });
  }
}
