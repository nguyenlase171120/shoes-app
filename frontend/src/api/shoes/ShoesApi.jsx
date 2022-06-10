import axiosClient from "../axiosClient";

export const ShoesApi = {
  addNewShoes: (params) => {
    const url = "/v1/shoes/registration";
    return axiosClient.post(url, params);
  },

  getAllShoes: () => {
    const url = "/v1/shoes/get-all";
    return axiosClient.get(url);
  },

  deleteShoes: (idProduct) => {
    const url = `/v1/shoes/delete`;
    return axiosClient.delete(url, { params: { id: idProduct } });
  },

  getShoesByPagination: (page) => {
    const url = "/v1/shoes/get-by-page";
    return axiosClient.get(url, { params: { page } });
  },

  getShoesById: (shoesId) => {
    const url = "/v1/shoes/get-by-id";
    return axiosClient.get(url, { params: { id: shoesId } });
  },

  updateShoesById: (params) => {
    const url = "/v1/shoes/update-by-id";
    return axiosClient.put(url, params);
  },

  searchShoesCharacters: (search) => {
    const url = `/v1/shoes/search-characters/${search}`;
    return axiosClient.get(url, search);
  },

  searchShoesName: (txtSearch) => {
    const url = "/v1/shoes/search";
    return axiosClient.get(url, { params: { keyword: txtSearch } });
  },
};
