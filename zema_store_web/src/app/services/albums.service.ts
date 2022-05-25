import { baseUrl } from ".";
import Request from "../api/request";

const getAlbums = async () => {
  const { data } = await Request.get(`${baseUrl}/albums`);
  return { data };
};

const addAlbum = async (formData: any) => {
  try {
    const { data } = await Request.post(`${baseUrl}/albums`, formData);
    return { data };
  } catch (error) {
    return { data: null, error };
  }
};

const updateAlbum = async (formData: any) => {
  try {
    const { data } = await Request.patch(`${baseUrl}/albums`, formData);
    await setTimeout(() => {}, 1000);
    return { data };
  } catch (error) {
    return { data: null, error };
  }
};

const deleteAlbum = async (id: any) => {
  try {
    // const { data } = await Request.delete(`${baseUrl}/albums${id}`);
    const data = id;
    await setTimeout(() => {}, 1000);
    return { data };
  } catch (error) {
    return { data: null, error };
  }
};

const AlbumsService = {
  getAlbums,
  addAlbum,
  updateAlbum,
  deleteAlbum,
};

export default AlbumsService;
