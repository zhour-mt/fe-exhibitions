import axios from "axios";

const api = axios.create({
  baseURL: "https://api.artic.edu/api/v1/artworks",
});

const fetchArticles = (sortQuery) => {
    return api.get(`/`).then((response) => {
      return response.data.data;
    });
};



export{
    fetchArticles
}



