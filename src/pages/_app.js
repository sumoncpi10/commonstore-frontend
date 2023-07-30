import { SessionProvider } from "next-auth/react"
import '@/styles/globals.css'
import Heade from "@/components/Layout/Heade";
import { Provider } from "react-redux";
import store from "@/redux/store";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
      <Heade />
      <Component {...pageProps} />
      </Provider>
      </SessionProvider>
  );
}
