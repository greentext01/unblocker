import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AppProps } from 'next/dist/shared/lib/router/router';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  window.location.href = "https://gameslist-with-shrimp.herokuapp.com/";

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
