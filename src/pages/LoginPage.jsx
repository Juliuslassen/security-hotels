import { useState } from 'react';
import apiFacada from '../util/apiFacade';
import { useNavigate } from 'react-router-dom';

function LoginPage({ isLoggedIn, setIsLoggedIn }) {
  const init = { username: '', password: '' };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const navigate = useNavigate();

  const performLogin = (evt) => {
    evt.preventDefault();
    apiFacada.login(
      loginCredentials.username,
      loginCredentials.password,
      setIsLoggedIn
    );
    navigate('/');
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div>
          <h1>login</h1>
          <form onChange={onChange}>
            <input placeholder="User Name" id="username" />
            <input placeholder="Password" id="password" />
            <button onClick={performLogin}>Login</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>logout</h1>
          <button onClick={() => apiFacada.logout(setIsLoggedIn)}>logout </button>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
