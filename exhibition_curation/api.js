import axios from "axios";

const fetchArtworks = (page = 1, limit = 20) => {
  return axios
    .get(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}`)
    .then((response) => {
      return {
        artworks: response.data.data,
        pagination: response.data.pagination,
      };
    });
};

const fetchArtworkById = (art_id) => {
  return axios
    .get(`https://api.artic.edu/api/v1/artworks/${art_id}`)
    .then((response) => {

      return response.data
    });
};

const postUser = (newUser) => {
  return axios
    .post(`http://localhost:9000/api/register`, newUser)
    .then((response) => {
      return response.data.user;
    });
};

const loginUser = (user) => {
  return axios
    .post(`http://localhost:9000/api/login`, user)
    .then((response) => {
      console.log(response);
      return response.data;
    });
};

let token = "";

if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

const dashboard = () => {
  return axios
    .get("http://localhost:9000/api/dashboard", {
      headers: {
        Authorisation: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export { fetchArtworks, postUser, loginUser, dashboard, fetchArtworkById };
