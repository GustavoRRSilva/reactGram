import "@/styles/globals.css";
import MainContainer from "@/components/MainContainer/maincontainer";
export default function App({ Component, pageProps }) {
  return (
    <MainContainer>
      <Component {...pageProps} />
    </MainContainer>
  );
}
