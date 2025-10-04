import { BuyMedicine } from "./type";
import { RemoveMedicine } from "./type";

interface State {
  NumberOfMedicine: number;
  headings: string[];
  selectedCards: any[];
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: State = {
  NumberOfMedicine: 0,
  headings: [],
  selectedCards: [],
};

export default function MedicineReducer(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case BuyMedicine:
      return {
        ...state,
        NumberOfMedicine: state.NumberOfMedicine + 1,
        selectedCards: [...state.selectedCards, action.payload],
      };
    case RemoveMedicine:
      return {
        ...state,
        NumberOfMedicine: state.NumberOfMedicine - 1,
        selectedCards: state.selectedCards.filter(
          (card) => card.name !== action.payload
        ),
      };

    default:
      return state;
  }
}
