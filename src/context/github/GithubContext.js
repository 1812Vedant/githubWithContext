import { createContext, useState } from "react";
const REACT_APP_GITHUB_URL = "https://api.github.com";
const REACT_APP_GITHUB_TOKEN = "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";
const GithubContext = createContext();

//Provider have our global state and function related to global state
export const GithubProvider = function ({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async function () {
    const response = await fetch(`${REACT_APP_GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${REACT_APP_GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();

    setUsers(data);
    setLoading(false);
  };

  return (
    <GithubContext.Provider value={{ users, loading, fetchUsers }}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;

//Context is our global state
//createContext method is used to create Context then that method return obj have provider method in which we have to wrap our children it has value prop in which we pass values that we want to access anywhere
