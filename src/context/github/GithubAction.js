import { useContext } from "react";
import GithubContext from "./GithubContext";
const REACT_APP_GITHUB_URL = "https://api.github.com";
const REACT_APP_GITHUB_TOKEN = "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";

export const searchUsers = async function (text) {
  const params = new URLSearchParams({ q: text });

  const response = await fetch(
    `${REACT_APP_GITHUB_URL}/search/users?${params}`,
    {
      headers: {
        Authorization: `token ${REACT_APP_GITHUB_TOKEN}`,
      },
    }
  );

  const { items } = await response.json();

  return items;
};

export const getUser = async (login) => {
  const response = await fetch(`${REACT_APP_GITHUB_URL}/users/${login}`, {
    headers: {
      Authorization: `token ${REACT_APP_GITHUB_TOKEN}`,
    },
  });
  if (response.status === 404) {
    window.location = "/notfound";
  } else {
    const data = await response.json();
    return data;
  }
};

//Get Repos

export const getUserRepos = async function (login) {
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

    return data;
  }
};
