import { Provider } from "react-redux";
import "./App.css";
import Body from "./components/Body";
import AppStore from "./utils/AppStore";

function App() {
  return (
    <Provider store={AppStore}>
      <Body></Body>
    </Provider>
  );
}

export default App;
