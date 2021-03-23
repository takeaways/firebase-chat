import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import reducer from "utils/redux/reducers/root";


const createStoreWithMiddleware = applyMiddleware( promiseMiddleware, ReduxThunk )( createStore );
const store = createStoreWithMiddleware( reducer );

export default store;