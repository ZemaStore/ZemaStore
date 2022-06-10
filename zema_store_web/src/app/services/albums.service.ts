import { baseUrl } from ".";
import Request from "../api/request";

const getAlbums = async (payload: {
  name: string;
  id: string | null;
  currentPage: number;
  orderBy: string;
}) => {
  let url = `${baseUrl}/albums`;
  switch (payload.name) {
    case "artists": {
      url = `${baseUrl}/albums/artist/${payload.id}?page=${
        payload.currentPage - 1
      }&sortBy=${payload.orderBy}`;
      break;
    }
    default: {
      url = `${baseUrl}/albums?page=${payload.currentPage - 1}&sortBy=${
        payload.orderBy
      }`;
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
    const albumData = { ...data.album, id: data.album._id };
    return { data: { album: albumData, songs: 0 } };
  } catch (error) {
    return { data: null, error };
  }
};

const updateAlbum = async (albumId: string, formData: any) => {
  try {
    const { data } = await Request.patch(
      `${baseUrl}/albums/${albumId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    const albumData = { ...data.album, id: data.album._id };

    return { data: { album: albumData, songs: 0 } };
  } catch (error) {
    return { data: null, error };
  }
};

const deleteAlbum = async (id: any) => {
  try {
    const {data} = await Request.delete(`${baseUrl}/albums/${id}`);
    console.log("response is ", data);
    return { data, error: null };
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
