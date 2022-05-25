import { baseUrl } from ".";
import Request from "../api/request";

const getArtists = async () => {
  const { data } = await Request.get(`${baseUrl}/artists`);
  return { data };
};

const addArtist = async (formData: any) => {
  try {
    const { data } = await Request.post(`${baseUrl}/artists`, formData);
    // const data = {
    //   id: "23243234234234",
    //   fullName: "John Doe",
    //   avatar: "https://cdn.tuk.dev/assets/templates/olympus/projects(3).png",
    //   followers: 12,
    //   listenedHours: 4239,
    //   albumsCount: 21,
    //   songsCount: 21,
    //   createdAt: "2020-01-01",
    // };
    return { data };
  } catch (error) {
    return { data: null, error };
  }
};

const updateArtist = async (formData: any) => {
  try {
    const { data } = await Request.patch(`${baseUrl}/artists`, formData);
    // const data = formData;
    await setTimeout(() => {}, 1000);
    return { data };
  } catch (error) {
    return { data: null, error };
  }
};

const deleteArtist = async (id: any) => {
  try {
    // const { data } = await Request.delete(`${baseUrl}/artists${id}`);
    const data = id;
    await setTimeout(() => {}, 1000);
    return { data };
  } catch (error) {
    return { data: null, error };
  }
};

const ArtistsService = {
  getArtists,
  addArtist,
  updateArtist,
  deleteArtist,
};

export default ArtistsService;
