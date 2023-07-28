import { SessionProvider } from "next-auth/react"
import '@/styles/globals.css'
import Navbar from "@/components/Layout/Navbar";
import Nav from "@/components/Layout/Nav";
export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
