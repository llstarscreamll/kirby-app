import { ActionReducer } from '@ngrx/store';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    const newState = reducer(state, action);
    console.log(
      '%c' + action.type + ' %O',
      'color: #e2fffb; font-size: 10px; background-color: #00a38e;',
      { payload: (<any>action).payload, oldState: state, newState }
    );
    return newState;
  };
}
