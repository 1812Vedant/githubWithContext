import axios from "axios";
const REACT_APP_GITHUB_URL = "https://api.github.com";
const REACT_APP_GITHUB_TOKEN = "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";

const github = axios.create({
  baseURL: REACT_APP_GITHUB_URL,
  headers: { Authorization: `token ${REACT_APP_GITHUB_TOKEN}` },
}); //in axios it direct give json data no need to .json and again await

export const searchUsers = async function (text) {
  const params = new URLSearchParams({ q: text });

  const response = await github.get(`/search/users?${params}`);

  return response.data.items;
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
