import React from 'react';
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { post } from '../../lib/superfetch';
import GoogleButton from './GoogleButton';

function LoginButton(props: { onLogin: (token: string) => void }) {
  async function onLogin(res: GoogleLoginResponse) {
    const response = await post('/api/auth', {
      idToken: res.tokenId,
    });

    const data = await response.json();
    props.onLogin(data.token);
  }

  function onLoginFail(error: { error: string; details: string }) {
    console.error(error.error);
    console.error(error.details);
  }

  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_CLIENT_ID as string}
      render={(renderProps) => (
        <GoogleButton signin={true} onClick={renderProps.onClick} />
      )}
      buttonText="Login"
      onSuccess={
        onLogin as (
          response: GoogleLoginResponse | GoogleLoginResponseOffline
        ) => void
      }
      onFailure={onLoginFail}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
    />
  );
}

export default LoginButton;
