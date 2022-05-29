import { baseUrl } from ".";
import Request from "../api/request";

const getSongs = async ({
  name = "all",
  id = null,
}: {
  name: string;
  id: string | null;
}) => {
  console.log(name, id, " is name and id");
  let url = `${baseUrl}/songs`;
  switch (name) {
    case "artists": {
      url = `${baseUrl}/songs/artist/${id}`;
      break;
    }
    case "albums": {
      url = `${baseUrl}/songs/album/${id}`;
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

const SongsService = {
  getSongs,
};

export default SongsService;
