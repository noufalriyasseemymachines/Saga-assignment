import { all } from "redux-saga/effects";
import watcherSaga from "./WatcherSaga";

export default function* rootSaga(){
    yield all([
        watcherSaga()
    ])
}