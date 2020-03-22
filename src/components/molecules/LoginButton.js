import React from 'react';
import Link from '../atoms/Link'
import {CLIENT_ID} from '../../Utils/constants'

import './LoginButton.css'

const LOGIN_URL_BASE = 'https://accounts.spotify.com/authorize'
const RESPONSE_TYPE = 'token'
const REDIRECT_URI = process.env.REACT_APP_ENV === 'prod' ? 'https://spotify-favourites.netlify.com/' : 'http://localhost:3000/'
const SCOPE = 'user-top-read'

const loginUrl = encodeURI(`${LOGIN_URL_BASE}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`)

function LoginButton() {
  return <div className='login-button'><Link url={loginUrl}>Login</Link></div>
}


export default LoginButton;
