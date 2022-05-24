import { Request, Response } from "express";
import { isNil } from "lodash";
import { cloudinaryUploader } from "../middlewares/cloudinary.middlewares";

import Album from "../models/mongoose/album";
import Song from "../models/mongoose/song";

import ErrorResponse from "../models/responses/error-response.model";
import OkResponse from "../models/responses/ok-response.model";
import Utils from "../utils/utils";
import {
  addAlbumSchema,
  deleteAlbumSchema,
  getAlbumsByArtistSchema,
  getAlbumSchema,
  getAlbumsSchema,
  updateAlbumSchema,
} from "../validation-schemas/album.schemas";

const albumImagesPath = "Album/Images";
const fetchItemCount = 10;

const getAlbum = async (req: Request, res: Response) => {
  try {
    const validate = getAlbumSchema.validate(req.params);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const album = await Album.findById(req.params.id).populate("artistId");
    const songs = await Song.count({ albumId: album._id });

    res
      .status(200)
      .send(new OkResponse({ album, songs }, "Album successfully fetched!"));
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const getAlbums = async (req: Request, res: Response) => {
  try {
    const search = req.query.search;
    const count = isNil(search)
      ? await Album.count()
      : await Album.count({
          title: {
            $regex: search,
          },
        });
    const totalPages = Utils.instance.getNumberOfPages(count, fetchItemCount);

    const validate = getAlbumsSchema.validate(req.query);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const { page, sort } = Utils.instance.getPaginationData(req);

    const albums = isNil(search)
      ? await Album.find({})
          .limit(fetchItemCount)
          .skip(page * fetchItemCount)
          .sort(sort)
          .populate("artistId")
      : await Album.find({
          title: {
            $regex: search,
          },
        })
          .limit(fetchItemCount)
          .skip(page * fetchItemCount)
          .sort(sort)
          .populate("artistId");

    const albumList = await Promise.all(
      albums.map(async (album) => {
        const songs = await Song.count({ albumId: album._id });
        return { album, songs };
      })
    );

    res
      .status(200)
      .send(
        new OkResponse(
          { albumList, totalPages, totalItems: count, pageNumber: page },
          null
        )
      );
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const getAlbumsByArtist = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    const query = req.query;
    const validate = getAlbumsByArtistSchema.validate(
      { params, query },
      { abortEarly: false }
    );
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const artistId: string = req.params.artistId;
    const search = req.query.search;
    const { page, sort } = Utils.instance.getPaginationData(req);

    const count = isNil(search)
      ? await Album.count({
          artistId,
        })
      : await Album.count({ artistId }).populate({
          path: "artistId",
          match: { fullName: { $regex: search } },
        });
    const totalPages = Utils.instance.getNumberOfPages(count, fetchItemCount);

    const albums = isNil(search)
      ? await Album.find({
          artistId,
        })
          .limit(fetchItemCount)
          .skip(page * fetchItemCount)
          .sort(sort)
          .populate("artistId")
      : await Album.find({}).populate({
          path: "artistId",
          match: { fullName: { $regex: search } },
        });

    const albumList = await Promise.all(
      albums.map(async (album) => {
        const songs = await Song.count({ albumId: album._id });
        return { album, songs };
      })
    );

    res
      .status(200)
      .send(
        new OkResponse(
          { albumList, totalPages, totalItems: count, pageNumber: page },
          "Albums successfully fetched!"
        )
      );
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const addAlbum = async (req: Request, res: Response) => {
  try {
    const validate = addAlbumSchema.validate(req.body);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const { artistId, title, releaseDate } = req.body;

    let upload;
    if (req.file) {
      const { path = "", filename = "" } = req.file;
      upload = await cloudinaryUploader(
        path,
        "auto",
        albumImagesPath,
        filename,
        res
      );
    }

    const albumData = new Album({
      artistId,
      title,
      imageUrl: !isNil(upload) ? upload.secure_url : "",
      releaseDate,
    });

    const album = await (await albumData.save()).populate("artistId");
    const songs = await Song.count({ albumId: album._id });

    res
      .status(200)
      .send(new OkResponse({ album, songs }, "Album successfully created!"));
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const updateAlbum = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    const body = req.body;
    const validate = updateAlbumSchema.validate(
      { params, body },
      { abortEarly: false }
    );
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    let upload;
    if (req.file) {
      const { path, filename } = req.file;
      upload = await cloudinaryUploader(
        path,
        "auto",
        albumImagesPath,
        filename,
        res
      );
    }

    const { artistId, title, releaseDate } = req.body;

    const albumData = await Album.findById(req.params.id);

    albumData.artistId = !isNil(artistId) ? artistId : albumData.artistId;
    albumData.title = !isNil(title) ? title : albumData.title;
    albumData.releaseDate = !isNil(releaseDate)
      ? releaseDate
      : albumData.releaseDate;
    albumData.imageUrl = !isNil(upload)
      ? upload.secure_url
      : albumData.imageUrl;

    const album = await (await albumData.save()).populate("artistId");
    const songs = await Song.count({ albumId: album._id });

    res
      .status(200)
      .send(new OkResponse({ album, songs }, "Album successfully updated!"));
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const deleteAlbum = async (req: Request, res: Response) => {
  try {
    const validate = deleteAlbumSchema.validate(req.params);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    await Album.findByIdAndDelete(req.params.id);

    res.status(200).send(new OkResponse(null, "Album successfully deleted!"));
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

export {
  getAlbum,
  getAlbums,
  getAlbumsByArtist,
  addAlbum,
  updateAlbum,
  deleteAlbum,
};
