import { baseUrl } from ".";
import Request from "../api/request";

const getArtists = async () => {
  const { data } = await Request.get(`${baseUrl}/artists`);
  return { data };
};

const ArtistsService = {
  getArtists,
};

export default ArtistsService;
