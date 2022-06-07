import type { PropsWithChildren } from "react";
import { Location } from "react-router-dom";

export type WithChildren<T = {}> = T & PropsWithChildren<{}>;

export type WithClassName<T = {}> = T & {
  className?: string;
};

export type LocationState = {
  from: Location;
};

export type PlaceType = {
  name: string;
  latitude: number;
  longitude: number;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isActive: boolean;
  avatar: string;
  subType: {
    subscriptionType: string;
    subscriptionId: string;
    summary: string;
    price: number;
  };
  address: {
    country: string;
    city: string;
    street: string;
    zip: string;
  };
  createdAt: string;
};

export type Artist = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string | null;
  avatar: string;
  followers: number;
  listenedHours: number;
  albumsCount: number;
  songsCount: number;
  createdAt: string;
};

export type Album = {
  id: string;
  title: string;
  imageUrl: string;
  artist: Artist;
  releaseDate: string;
  songs: number;
  createdAt: string;
};

export type Song = {
  id: string;
  title: string;
  cover: string;
  song?: string;
  album: Album;
  genre: string;
  length: number;
  listenersCount: number;
  releaseDate: string;
  createdAt: string;
};
export type Subscription = {
  id: string;
  title: string;
  summary: string;
  cover: string;
  price: number;
  subType: string;
  createdAt: string;
};

export type Event = {
  id: string;
  title: string;
  summary: string;
  cover: string;
  venue: PlaceType;
  createdAt: string;
  startDate: string;
  endDate: string;
};

export type Follow = {
  id: string;
  follower: User;
  followee: Artist;
  createdAt: string;
};
