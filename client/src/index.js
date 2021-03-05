import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import { store } from './flux/store/configureStore' 

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
registerServiceWorker();
