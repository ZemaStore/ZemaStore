import { Request, Response } from "express";
import { isNil } from "lodash";
import { cloudinaryUploader } from "../middlewares/cloudinary.middlewares";

import Album from "../models/mongoose/album";

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

    const album = await Album.findById(req.params.id);

    res.status(200).send(new OkResponse(album, "Album successfully fetched!"));
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const getAlbums = async (req: Request, res: Response) => {
  try {
    const count = await Album.count();
    const totalPages = Utils.instance.getNumberOfPages(count, fetchItemCount);

    const validate = getAlbumsSchema.validate(req.query);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const { page, sort } = Utils.instance.getPaginationData(req);

    const albums = await Album.find({})
      .limit(fetchItemCount)
      .skip(page * fetchItemCount)
      .sort(sort);

    res
      .status(200)
      .send(new OkResponse({ albums, totalPages, totalItems: count }, null));
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
    const { page, sort } = Utils.instance.getPaginationData(req);

    const count = await Album.count({
      artistId,
    });
    const totalPages = Utils.instance.getNumberOfPages(count, fetchItemCount);

    const albums = await Album.find({
      artistId,
    })
      .limit(fetchItemCount)
      .skip(page * fetchItemCount)
      .sort(sort);

    res
      .status(200)
      .send(
        new OkResponse(
          { albums, totalPages, totalItems: count },
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
    const { path = "", filename = "" } = req.file;

    const upload = await cloudinaryUploader(
      path,
      "auto",
      albumImagesPath,
      filename,
      res
    );

    const albumData = new Album({
      artistId,
      title,
      imageUrl: upload.secure_url,
      releaseDate,
    });

    const album = await albumData.save();

    res.status(200).send(new OkResponse(album, "Album successfully created!"));
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
    albumData.imageUrl = !isNil(upload.secure_url)
      ? upload.secure_url
      : albumData.imageUrl;

    const album = await albumData.save();

    res.status(200).send(new OkResponse(album, "Album successfully updated!"));
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
