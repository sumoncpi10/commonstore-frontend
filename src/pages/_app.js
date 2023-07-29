import { SessionProvider } from "next-auth/react"
import '@/styles/globals.css'
import Navbar from "@/components/Layout/Navbar";
import Heade from "@/components/Layout/Heade";
import Nav from "@/components/Layout/Nav";
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
