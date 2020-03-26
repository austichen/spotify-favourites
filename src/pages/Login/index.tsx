import React from 'react';
import LoginButton from '../../components/molecules/LoginButton'
import {Title, Icon} from '../../components/atoms'
import { IAccessTokenInfo } from '../../utils/constants';
import './Login.css';

interface Props {
  loginSuccessCallback : (accessTokenInfo : IAccessTokenInfo) => void
}

const LoginPage = ({loginSuccessCallback} : Props) => {
  return (
    <div className='page login-page'>
      <div className='content'>
        <div className='main-text'>
          <Title>Check your top artists and tracks, anytime.</Title>
          <LoginButton loginCallback={(success : boolean, accessTokenInfo? : IAccessTokenInfo) => success && accessTokenInfo && loginSuccessCallback(accessTokenInfo)}/>
        </div>
        <div className='album-covers'>
          {/*LOVER*/}
          <Icon size={250} url='https://i.scdn.co/image/ab67616d00001e02e787cffec20aa2a396a61647' />
          {/*ASCEND*/}
          <Icon size={250} url='https://i.scdn.co/image/ab67616d00001e02529c6fa82d23f65076c1579b' />
          {/*STARBOY*/}
          <Icon size={250} url='https://i.scdn.co/image/ab67616d00001e026ef66e4b651d7617f31a4725' />
          {/*HEAD IN THE CLOUDS*/}
          <Icon size={250} url='https://i.scdn.co/image/ab67616d00001e024aedbebc17bc6ebccad220e9' />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
