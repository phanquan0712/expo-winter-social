import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootStore from "./reducer";
const middleware = [thunk];
export default createStore(rootStore, composeWithDevTools(applyMiddleware(...middleware)));