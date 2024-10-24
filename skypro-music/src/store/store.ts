import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";
import { authReducer } from "./features/authSlice";
import TrackReducer  from "./features/trackSlice";

// Функция makeStore создает и возвращает хранилище Redux с помощью функции configureStore.
export const makeStore = () => {
    return configureStore({
        // Передаем объект, в котором свойство reducer содержит корневой редьюсер, объединяющий все редьюсеры приложения.
        reducer: combineReducers({
            auth: authReducer,
            tracksSlice: TrackReducer,
        }),
    });
};

// Тип AppStore представляет собой тип нашего хранилища Redux, который возвращает функция makeStore.
export type AppStore = ReturnType<typeof makeStore>;

// Тип RootState представляет собой тип состояния нашего приложения, который возвращает функция getState хранилища Redux.
export type RootState = ReturnType<AppStore["getState"]>;

// Тип AppDispatch представляет собой тип функции диспетчера, который возвращает функция dispatch хранилища Redux.
export type AppDispatch = AppStore["dispatch"];

// Хуки useAppDispatch, useAppSelector и useAppStore позволяют использовать функции useDispatch, useSelector и useStore из библиотеки react-redux с типизацией.
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
