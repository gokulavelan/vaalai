import { DayBookState, initialDayBookState } from './state';
import { DayBookActions, SET_DAYBOOK } from './actions';

export function dayBookReducer(state = initialDayBookState, action: DayBookActions): DayBookState {
  switch (action.type) {
    case SET_DAYBOOK:
      return { ...state, entries: action.payload.entries };
    default:
      return state;
  }
}
