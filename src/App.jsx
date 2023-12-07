import { useState } from 'react';
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import './App.css';
import MainLayout, { loader as mainLoader } from './layout/MainLayout';
import ErrorPage from './pages/Errorpage';
import LoginPage from './pages/LoginPage';
import DataPage from './pages/DataPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dataFromServer, setDataFromServer] = useState([]);

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<MainLayout isLoggedIn={isLoggedIn} />}
        
        errorElement={<ErrorPage />}
      >
        <Route
          path="login"
          element={
            <LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="data"
          element={<DataPage isLoggedIn={isLoggedIn} dataFromServer={dataFromServer} setDataFromServer={setDataFromServer} />}
        />
      </Route>
    )
  );

  return (
    <>
      <div>
        <RouterProvider router={routes} />
        <Outlet />
      </div>
    </>
  );
}

export default App;
