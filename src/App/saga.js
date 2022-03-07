import { eventChannel, END } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";
import { setDocument, setLog, setMap, sendMessage } from "./actions";

const createWebSocketConnection = () => {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket("wss://hometask.eg1236.com/game1/");
    socket.onopen = function () {
      resolve(socket);
    };
    socket.onerror = function (evt) {
      reject(evt);
    };
  });
};

const createSocketChannel = (socket) => {
  return eventChannel((emit) => {
    socket.onmessage = (event) => {
      emit(event.data);
    };
    socket.onclose = () => {
      emit(END);
    };
    const unsubscribe = () => {
      socket.onmessage = null;
    };
    return unsubscribe;
  });
};

export default function* initializeSocket() {
  const socket = yield call(createWebSocketConnection);
  const socketChannel = yield call(createSocketChannel, socket);
  socket.send("help");
  yield takeEvery(socketChannel, receiveSocketMessages);
  yield takeEvery(sendMessage, function* (action) {
    socket.send(action.payload);
  });
}

function* receiveSocketMessages(message) {
  if (message.indexOf("help") !== -1) {
    return yield put(setDocument(message));
  } else if (message.indexOf("map:\n") !== -1) {
    return yield put(setMap(message));
  } else {
    if (message === "new: OK") {
      yield put(sendMessage("map"));
    }
    if (message.startsWith("open")) {
      yield put(sendMessage("map"));
    }
    return yield put(setLog(message));
  }
}
