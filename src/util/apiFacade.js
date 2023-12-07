console.log('hej verden jeg har nået til apiFacaden');

const URL = 'http://localhost:7070/api/v1/';
const HotelROUTE = 'hotels';
const AUTHENTICATION_ROUTE = 'auth/login';

function apiFacade() {
  const setToken = (token) => {
    localStorage.setItem('jwtToken', token);
  };

  const getToken = () => {
    localStorage.getItem('jwtToken');
  };

  const handleHttpErrors = (res) => {
    if (!res.ok) {
      return Promise.reject({ status: res.status, fullError: res.json() });
    }
    return res.json();
  };

  const login = (user, password, callback) => {
    console.log('jeg er fanget i login funktionen', user, password);

    const payload = { username: user, password: password };

    const options = makeOptions('POST', payload);

    return fetch(URL + AUTHENTICATION_ROUTE, options)
      .then(handleHttpErrors)
      .then((json) => {
        setToken(JSON.stringify(json.token)), callback(true);
      })
      .catch((error) => {
        if (error.status) {
          error.fullError.then((err) => console.log(err));
        } else {
          console.log('seriøs fejl', error);
        }
      });
  };

  const makeOptions = (method, payload, addToken) => {
    const opts = {
      method: method,
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
      },
    };

    if (addToken) {
      opts.headers['Authorization'] = `Bearer ${getToken()}`;
    }

    if (payload) {
      opts.body = JSON.stringify(payload);
    }
    return opts;
  };

  const getUserRoles = () => {
    const token = getToken();
    if (token != null) {
      const payloadBase64 = getToken().split('.')[1];
      const decodedClaims = JSON.parse(window.atob(payloadBase64));
      const roles = decodedClaims.roles;
      return roles;
    } else return '';
  };

  const fetchData = (endpoint, method, payload) => {
    const options = makeOptions(method, payload, true); //True add's the token
    return fetch(URL + endpoint, options).then(handleHttpErrors);
  };

  const logout = (callback) => {
    localStorage.removeItem('jwtToken');
    callback(false);
  };

  const hasUserAccess = (neededRole, loggedIn) => {
    const roles = getUserRoles().split(',');
    return loggedIn && roles.includes(neededRole);
  };

  return {
    makeOptions,
    setToken,
    getToken,
    login,
    logout,
    getUserRoles,
    hasUserAccess,
    fetchData,
  };
}

const facade = apiFacade();
export default facade;
