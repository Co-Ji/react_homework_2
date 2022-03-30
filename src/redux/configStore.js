//configStore.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import word from "./modules/word";

// root 리듀서를 만들어줍니다.
// 나중에 리듀서를 여러개 만들게 되면 여기에 하나씩 추가해주는 거예요!
const rootReducer = combineReducers({ word });
// 미들 웨어를 모은다.
const middlewares = [thunk];

// 옵션들을 묶는다.
const enhancer = applyMiddleware(...middlewares);
// 리듀서 와 옵션을 더해 스토어를 만듭니다.
const store = createStore(rootReducer, enhancer);

export default store;
