import { createGlobalStyle } from "styled-components";
import {CartContextProvider} from "@/components/CartContext";
import NoSsr from "@/components/NoSsr";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #eee;
    padding:0;
    margin:0;
    font-family: 'Poppins', sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <NoSsr>
        <CartContextProvider>
          <GlobalStyles/>
          <Component {...pageProps} />
        </CartContextProvider>
      </NoSsr>
    </>
  )
}

