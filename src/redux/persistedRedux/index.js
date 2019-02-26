import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "@reducers";

const middleWares = [thunk, logger]

const persistConfig = {
	key: "root",
	storage
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(...middleWares));

export const persistor = persistStore(store);