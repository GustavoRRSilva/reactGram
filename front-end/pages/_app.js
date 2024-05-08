import "@/styles/globals.css";
import MainContainer from "@/components/MainContainer/maincontainer";
//Redux
import { Provider } from "react-redux";
import { store } from "@/store";
//Hooks 

export default function App({ Component, pageProps }) {
  
  return (
    <Provider store={store}>
      <MainContainer>
        <Component {...pageProps} />
      </MainContainer>
    </Provider>
  );
}

