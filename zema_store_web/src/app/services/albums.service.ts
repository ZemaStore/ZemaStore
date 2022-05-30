import { baseUrl } from ".";
import Request from "../api/request";

const getAlbums = async (payload: { name: string; id: string | null }) => {
  let url = `${baseUrl}/albums`;
  switch (payload.name) {
    case "artists": {
      url = `${baseUrl}/albums/artist/${payload.id}`;
      break;
    }
    default: {
      url = `${baseUrl}/albums`;
      break;
    }
  }
  console.log(payload.name, payload.id, " is name and id");
  const { data } = await Request.get(url);
  return { data };
};

const addAlbum = async (formData: any) => {
  try {
    const { data } = await Request.post(`${baseUrl}/albums`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
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
