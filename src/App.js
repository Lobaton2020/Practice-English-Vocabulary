import { createContext, useReducer } from 'react';
import { Wrapper } from './components/WrapperComponent';

export const ACTIONS = {
  ADD_VOCABULARY: "ADD_VOCABULARY",
  ADD_NOTIFICATION: "ADD_NOTIFICATION"
};
const Reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_VOCABULARY:
      return {
        ...state,
        vocabularyList: action.payload
      }
    case ACTIONS.ADD_NOTIFICATION:
      return {
        ...state,
        vocabularyList: action.payload
      }
    default:
      return state;
  }
}

const initState = {
  vocabularyList: [],
  notifications: []
};

export const AppContext = createContext();
function App() {
  const [state, dispatch] = useReducer(Reducer, initState);
  return (
    <AppContext.Provider value={[state, dispatch]} >
      <Wrapper/>
    </AppContext.Provider >
  )
}

export default App;
