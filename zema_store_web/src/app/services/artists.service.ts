import { baseUrl } from ".";
import Request from "../api/request";

const getArtists = async () => {
  const { data } = await Request.get(`${baseUrl}/artists`);
  return { data };
};

const getArtistById = async (artistId: any) => {
  const { data } = await Request.get(`${baseUrl}/artists/${artistId}`);
  return { data };
};

const searchArtistByName = async (query: string) => {
  try {
    const { data } = await Request.get(
      `${baseUrl}/artists?search=${query.trim()}`
    );
    return data;
  } catch (error) {}
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

const updateArtist = async (id: string, formData: any) => {
  try {
    const { data } = await Request.patch(`${baseUrl}/artists/${id}`, formData);
    return { data };
  } catch (error) {
    return { data: null, error };
  }
};

const deleteArtist = async (id: any) => {
  try {
    const { data } = await Request.delete(`${baseUrl}/artists/${id}`);
    return { data };
  } catch (error) {
    return { data: null, error };
  }
};

const ArtistsService = {
  searchArtistByName,
  getArtistById,
  getArtists,
  addArtist,
  updateArtist,
  deleteArtist,
};

export default ArtistsService;
