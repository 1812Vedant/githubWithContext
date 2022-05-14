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
  const getUser = async (login) => {
    setLoading();
    const response = await fetch(`${REACT_APP_GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${REACT_APP_GITHUB_TOKEN}`,
      },
    });
    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      dispatch({ type: "GET_USER", payload: data });
    }
  };

  //Get Repos

  const getUserRepos = async function (login) {
    setLoading();

    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    const response = await fetch(
      `${REACT_APP_GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );

    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();

      dispatch({
        type: "GET_REPOS",
        payload: data,
      });
    }
  };

  //Clear Users
  const clearUsers = function () {
    dispatch({ type: "CLEAR_USERS" });
  };

  return (
    <GithubContext.Provider
      value={{
        clearUsers,
        getUser,
        getUserRepos,
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
