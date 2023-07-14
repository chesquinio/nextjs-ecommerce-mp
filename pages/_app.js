import { createGlobalStyle } from "styled-components";
import {CartContextProvider} from "@/components/CartContext";

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
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
      <CartContextProvider>
        <GlobalStyles/>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  )
}

