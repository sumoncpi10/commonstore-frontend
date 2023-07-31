import { SessionProvider } from "next-auth/react"
import '@/styles/globals.css'
import Header from "@/components/Layout/Header";
import { Provider } from "react-redux";
import store from "@/redux/store";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
      <Header />
      <Component {...pageProps} />
      </Provider>
      </SessionProvider>
  );
}
