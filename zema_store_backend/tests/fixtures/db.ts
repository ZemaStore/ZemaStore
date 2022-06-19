import mongoose from "mongoose";
import { ObjectId } from "mongodb";

import configs from "../../src/configs/app.configs";
import app from "../../src/app";
import User from "../../src/models/mongoose/user";
import ArtistProfie from "../../src/models/mongoose/artist-profile";
import Album from "../../src/models/mongoose/album";

const connect = async () => {
  // await mongoose.disconnect();
  try {
    mongoose.connect(configs.DATABASE_TEST_URL, () => {
      // app.listen(configs.PORT, () => {
      return console.log(
        `Express is listening at http://localhost:${configs.PORT}`
      );
      // });
    });
  } catch (e) {
    console.log(e);
  }
};

// const closeDatabase = async () => {
//   mongoose.disconnect();
// };

jest.setTimeout(200000);

const artistOneId = new ObjectId();
const artistTwoId = new ObjectId();
const artistThreeId = new ObjectId();
const albumOneId = new ObjectId();
const albumTwoId = new ObjectId();

const artistOne = {
  _id: artistOneId.toString(),
  email: "dave@zema.com",
  password: "Test1234-!",
  phone: "0912345678",
  roleId: "62af065599c04d446a931b79",
  profileId: "62af7e011e4fd96ca2eaf26f",
  onModel: "ArtistProfile",
  firstName: "Dave",
  lastName: "Getachew",
};

const artistTwo = {
  _id: artistTwoId.toString(),
  email: "agegnew@zema.com",
  password: "Test1234-!",
  phone: "0912345768",
  roleId: "62af065599c04d446a931b79",
  profileId: "62af7e22b19872f54ae74501",
  onModel: "ArtistProfile",
  firstName: "Agegnew",
  lastName: "Yideg",
};

const artistThree = {
  _id: artistThreeId.toString(),
  email: "hana@zema.com",
  password: "Test1234-!",
  phone: "0913245678",
  roleId: "62af065599c04d446a931b79",
  profileId: "62af7e3ec2a4adb1fa162e33",
  onModel: "ArtistProfile",
  firstName: "Hana",
  lastName: "Tekle",
};

const albumOne = {
  _id: albumOneId.toString(),
  artistId: artistTwoId.toString(),
  title: "Yehiwot minch",
  releaseDate: "2022-07-21",
};

const albumTwo = {
  _id: albumTwoId.toString(),
  artistId: artistThreeId.toString(),
  title: "Agzegn",
  releaseDate: "2022-07-21",
};

const setUpDatabase = async () => {
  await User.deleteMany({ roleId: "62af065599c04d446a931b79" });
  await ArtistProfie.deleteMany({ firstName: "Yohannes" });
  await Album.deleteMany({});

  await User.create(artistOne);
  await User.create(artistTwo);
  await User.create(artistThree);

  await Album.create(albumOne);
  await Album.create(albumTwo);
};

export { connect, setUpDatabase, artistOneId, albumOneId };
