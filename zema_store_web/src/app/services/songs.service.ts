import { baseUrl } from ".";
import Request from "../api/request";

const getSong = async (id: string) => {
  try {
    const { data } = await Request.get(`${baseUrl}/songs/${id}`);
    return { data: data.song, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const getSongs = async ({
  name = "all",
  id = null,
  currentPage,
  orderBy,
}: {
  name: string;
  id: string | null;
  currentPage: number;
  orderBy: string;
}) => {
  console.log(name, id, " is name and id");
  let url = `${baseUrl}/songs`;
  switch (name) {
    // case "artists": {
    //   url = `${baseUrl}/songs/artist/${id}?page=${
    //     currentPage - 1
    //   }&sortBy=${orderBy}`;
    //   break;
    // }
    case "artists":
    case "albums": {
      url = `${baseUrl}/songs/album/${id}?page=${
        currentPage - 1
      }&sortBy=${orderBy}`;
      break;
    }
    default: {
      url = `${baseUrl}/songs`;
      break;
    }
  }
  const { data } = await Request.get(url);

  // const data = [
  //   {
  //     id: "23323455232",
  //     title: "Single",
  //     cover: "https://cdn.tuk.dev/assets/templates/olympus/projects(3).png",
  //     artist: "sfasasfda",
  //     releaseDate: "2020-02-01",
  //     songs: 21,
  //     createdAt: "2020-01-01",
  //   },

  //   {
  //     id: "1232322323234",
  //     title: "Thomas Doe",
  //     cover: "https://cdn.tuk.dev/assets/templates/olympus/projects(1).png",
  //     artist: "sfasasfda",
  //     releaseDate: "2020-01-01",
  //     songs: 21,
  //     createdAt: "2020-01-02",
  //   },
  //   {
  //     id: "1wef3232423423423",
  //     title: "Thomas Doe",
  //     cover: "https://cdn.tuk.dev/assets/templates/olympus/projects(2).png",
  //     artist: "asdfasdfwerwe",
  //     releaseDate: "2020-05-01",
  //     songs: 21,
  //     createdAt: "2020-01-01",
  //   },
  // ];
  return { data };
};

const addSong = async (formData: any) => {
  try {
    const { data } = await Request.post(`${baseUrl}/songs`, formData);

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const updateSong = async (id: string, formData: any) => {
  try {
    const { data } = await Request.patch(`${baseUrl}/songs/${id}`, formData);
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const deleteSong = async (id: any) => {
  try {
    const { data } = await Request.delete(`${baseUrl}/songs/${id}`);
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const SongsService = {
  getSong,
  getSongs,
  addSong,
  updateSong,
  deleteSong,
};

export default SongsService;
