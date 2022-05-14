import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";

const REACT_APP_GITHUB_URL = "https://api.github.com";
const REACT_APP_GITHUB_TOKEN = "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";
const GithubContext = createContext();

//Provider have our global state and function related to global state
export const GithubProvider = function ({ children }) {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);
  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };
  //get search results

  //Get single user

  //Clear Users

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;

//Context is our global state
//createContext method is used to create Context then that method return obj have provider method in which we have to wrap our children it has value prop in which we pass values that we want to access anywhere
