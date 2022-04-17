import type { PropsWithChildren } from "react";

export type WithChildren<T = {}> = T & PropsWithChildren<{}>;

export type WithClassName<T = {}> = T & {
  className?: string;
};

export type User = {
  id: string;
  fullName: string;
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
  fullName: string;
  avatar: string;
  followers: number;
  listenedHours: number;
  albumsCount: number;
  songsCount: number;
  createdAt: string;
};
