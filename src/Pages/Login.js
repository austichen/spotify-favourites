import React from 'react';
import {CLIENT_ID} from '../Utils/constants'
import './Login.css';

const LOGIN_URL = 'https://accounts.spotify.com/authorize'
const RESPONSE_TYPE = 'token'
const REDIRECT_URI = process.env.REACT_APP_ENV === 'prod' ? 'https://spotify-favourites.netlify.com/' : 'http://localhost:3000/'
const SCOPE = 'user-top-read'

function LoginPage() {
  return (
    <div className='page login-page'>
        <p>
            Click below to login and view your Spotify stats.
        </p>
        <a
          className="App-link"
          href={encodeURI(`${LOGIN_URL}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`)}
        >
          Login
        </a>
    </div>
  );
}

export default LoginPage;
