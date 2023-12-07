import { useLoaderData, useNavigate } from 'react-router-dom';
import apiFacada from '../util/apiFacade';
import { useEffect, useState } from 'react';

function DataPage({ isLoggedIn }) {
  const navigate = useNavigate();

  const [dataFromServer, setDataFromServer] = useState([]);

  useEffect(() => {
    apiFacada.fetchData('hotels', 'GET').then((data) => {
      setDataFromServer(data);
    });
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>data</h1>

          {dataFromServer.map((hotel, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '15px',
              }}
            >
              <h2 style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                {hotel.hotelName}
              </h2>

              <div style={{ marginBottom: '10px' }}>
                <p style={{ marginBottom: '0', fontWeight: 'bold' }}>
                  Hotel Type:
                </p>
                <p>{hotel.hotelType}</p>
              </div>

              <p style={{ marginBottom: '0', fontWeight: 'bold' }}>
                Hotel Address:
              </p>
              <p>{hotel.hotelAddress}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1>you are not logged in</h1>
          <button onClick={() => navigate('/login')}>Go to login</button>
        </div>
      )}
    </div>
  );
}

export default DataPage;
