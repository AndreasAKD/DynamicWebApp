import IntlProviderFunction from '../components/IntlProvider';
import { AppProps } from 'next/app';
import { Geist, Geist_Mono } from 'next/font/google';
import '../app/globals.css';
import Menu from '../components/menu';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IntlProviderFunction pageProps={pageProps}>
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="container">
          <Menu />
          <Component {...pageProps} />
        </div>
      </div>
    </IntlProviderFunction>
  );
}

export default MyApp;