import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AppProps } from 'next/dist/shared/lib/router/router';
import { getMessaging, getToken } from 'firebase/messaging';
import Head from 'next/head';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  useEffect(() => {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: 'BK2jMOyFG6hcs6dYm0CdnbKgPLqwTgi6eabaviRj-UPPwSbgl7hYuui2EOGwn_nfyTdiAmQ_SMnKtU8Lzoqpabo' })
      .then((currentToken) => {
        if (currentToken) {
          console.log(currentToken);
        } else {
          console.log(
            'No registration token available. Request permission to generate one.'
          );
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Node unblocker</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
