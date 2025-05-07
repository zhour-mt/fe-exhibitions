import axios from "axios";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 403) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

const fetchChicagoArtworks = ({
  page = 1,
  limit = 20,
  searchTerm = "",
  filter = "",
}) => {
  let url = `https://api.artic.edu/api/v1/artworks/search?page=${page}&limit=${limit}`;

  if (searchTerm.length > 0) {
    url += `&q=${encodeURIComponent(searchTerm)}`;
  }

  if (filter) {
    url += `&query[term][artwork_type_title]=${encodeURIComponent(filter)}`;
  }
  return axios.get(url).then((searchResponse) => {
    const artworksBasic = searchResponse.data.data;
    const pagination = searchResponse.data.pagination;

    const detailPromises = artworksBasic.map((art) =>
      axios
        .get(`https://api.artic.edu/api/v1/artworks/${art.id}`)
        .then((res) => res.data.data)
        .catch(() => null)
    );

    return Promise.all(detailPromises).then((fullArtworks) => {
      const artworks = fullArtworks.filter(Boolean);
      return { artworks, pagination };
    });
  });
};

const fetchHarvardArtworks = ({ page = 1, size = 20, searchTerm = "" }) => {
  const apiKey = process.env.NEXT_PUBLIC_HARVARD_API_KEY;
  let url = `https://api.harvardartmuseums.org/object?apikey=${apiKey}&page=${page}&size=${size}&hasimage=1`;

  if (searchTerm) {
    url += `&q=title:${encodeURIComponent(searchTerm)}`;
  }

  return axios.get(url).then((response) => {
    const artworks = response.data.records.map((item) => ({
      id: item.id,
      title: item.title,
      image_id: item.primaryimageurl, // full URL
      artist_title: item.people?.[0]?.name || "Unknown",
      source: "harvard",
    }));

    return {
      artworks,
      pagination: {
        current_page: page,
        total_pages: Math.ceil(response.data.info.totalrecords / size),
      },
    };
  });
};

const fetchChicagoArtworkById = (id) => {
  return axios
    .get(`https://api.artic.edu/api/v1/artworks/${id}`)
    .then((response) => {
      const data = response.data.data;
      return {
        id: data.id,
        title: data.title,
        artist_title: data.artist_title || "Unknown",
        date_display: data.date_display || "",
        dimensions: data.dimensions,
        image_url: `https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg`,
        medium_display: data.medium_display,
        department_title: data.department_title,
        artwork_type_title: data.artwork_type_title,
        place_of_origin: data.place_of_origin,
        thumbnail: {
          alt_text: data.thumbnail?.alt_text || "",
        },
      };
    });
};


const fetchHarvardArtworkById = (id) => {
  const apiKey = process.env.NEXT_PUBLIC_HARVARD_API_KEY;

  return axios
    .get(`https://api.harvardartmuseums.org/object/${id}?apikey=${apiKey}`)
    .then((response) => {
      const data = response.data;
      return {
        id: data.objectid,
        title: data.title,
        artist_title: data.people?.[0]?.name || "Unknown",
        date_display: data.dated || "",
        dimensions: data.dimensions,
        image_url: data.primaryimageurl,
        medium_display: data.technique,
        department_title: data.department,
        artwork_type_title: data.classification,
        place_of_origin: data.culture,
        thumbnail: {
          alt_text: data.description || "",
        },
      };
    });
};

const postUser = (newUser) => {
  return axios
    .post(`https://be-exhibitions.onrender.com/api/register`, newUser)
    .then((response) => {
      return response.data.user;
    }).catch((err) => {
      return err
    })
};

const loginUser = (user) => {
  return axios
    .post(`https://be-exhibitions.onrender.com/api/login`, user)
    .then((response) => {
      localStorage.setItem("username", user.username);
      return response.data;
    });
};

const dashboard = () => {
  const token = localStorage.getItem("token");
  return axios
    .get("https://be-exhibitions.onrender.com/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

const fetchExhibitions = () => {
  const token = localStorage.getItem("token");
  return axios
    .get("https://be-exhibitions.onrender.com/api/user/exhibitions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.exhibitions;
    });
};

const postExhibition = (newExhibition) => {
  const token = localStorage.getItem("token");
  return axios
    .post("https://be-exhibitions.onrender.com/api/user/exhibitions", newExhibition, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.exhibition;
    });
};

const deleteExhibition = (id) => {
  const token = localStorage.getItem("token");
  return axios
    .delete(`https://be-exhibitions.onrender.com/api/user/exhibitions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    });
};

const fetchExhibitionById = (id) => {
  const token = localStorage.getItem("token");
  return axios
    .get(`https://be-exhibitions.onrender.com/api/user/exhibitions/${id}/artworks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

const fetchSavedArtworks = () => {
  const token = localStorage.getItem("token");
  return axios
    .get(`https://be-exhibitions.onrender.com/api/user/exhibitions/artworks`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data.saveArtworks)
      return response.data.savedArtworks;
    });
};

const saveArtwork = (artwork) => {
  const token = localStorage.getItem("token");
  return axios
    .post("https://be-exhibitions.onrender.com/api/user/exhibitions/artworks", artwork, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.exhibition;
    });
};

const deleteArtwork = (artwork_id) => {
  const token = localStorage.getItem("token");
  return axios
    .delete(
      `https://be-exhibitions.onrender.com/api/user/exhibitions/artworks/${artwork_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      return response;
    });
};

const fetchGuestArtworks = () => {
  const guest_session_id = localStorage.getItem("guest_session_id");

  if (!guest_session_id) {
    return Promise.reject("No guest session ID found in localStorage.");
  }

  return axios
    .get("https://be-exhibitions.onrender.com/api/exhibitions/guest-artworks", {
      params: { guest_session_id },
    })
    .then((response) => {
      return response.data.savedArtworks;
    });
};

const postGuestArtworks = (artwork) => {
  const guest_session_id = localStorage.getItem("guest_session_id");
  if (!guest_session_id) {
    return Promise.reject("No guest session ID found in localStorage.");
  }

  return axios
    .post("https://be-exhibitions.onrender.com/api/exhibitions/guest-artworks", artwork, {
      params: { guest_session_id },
    })
    .then((response) => {
      return response.data.savedArtwork;
    });
};

const deleteGuestArtwork = (artwork_id) => {
  const guest_session_id = localStorage.getItem("guest_session_id");

  if (!guest_session_id) {
    return Promise.reject("No guest session ID found in localStorage.");
  }

  return axios
    .delete(
      `https://be-exhibitions.onrender.com/api/exhibitions/guest-artworks/${artwork_id}`,
      {
        params: { guest_session_id },
      }
    )
    .then((response) => {
      return response.data;
    });
};

export {
  fetchChicagoArtworks,
  postUser,
  loginUser,
  dashboard,
  fetchChicagoArtworkById,
  fetchExhibitions,
  postExhibition,
  deleteExhibition,
  fetchExhibitionById,
  fetchSavedArtworks,
  saveArtwork,
  deleteArtwork,
  fetchGuestArtworks,
  fetchHarvardArtworks,
  fetchHarvardArtworkById,
  postGuestArtworks,
  deleteGuestArtwork
};