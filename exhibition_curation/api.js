import axios from "axios";


const fetchArtworks = () => {
  return axios.get(`http://api.artic.edu/api/v1/artworks/`).then((response) => {
    return response.data.data;
  });
};

const postUser = (newUser) => {
  return axios.post(`http://localhost:3000/register`, newUser).then((response) => {
    return response.data.user;
  });
};

export { fetchArtworks, postUser };
