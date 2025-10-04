import { createStore } from "redux";
import MedicineReducer from "./reducer";

const store = createStore(MedicineReducer);


export type RootState = ReturnType<typeof MedicineReducer>;

export default store;
