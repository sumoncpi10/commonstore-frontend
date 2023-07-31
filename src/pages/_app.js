import { SessionProvider } from "next-auth/react"
import '@/styles/globals.css'
// import Header from "@/components/Layout/Header";
// import { Provider } from "react-redux";
// import store from "@/redux/store";

// export default function App({ Component, pageProps }) {
//   return (
//     <SessionProvider session={pageProps.session}>
//       {/* <Provider store={store}> */}
//       <Header />
//       <Component {...pageProps} />
//       {/* </Provider> */}
//       </SessionProvider>
//   );
// }
export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <SessionProvider session={pageProps.session}>
      {
         getLayout(<Component {...pageProps} />)
      }
      </SessionProvider>
  )
}
