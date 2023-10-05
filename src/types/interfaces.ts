export interface EventInfo {
  _id: string;
  title: string;
  flyerFront?: null | string;
  attending: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  contentUrl: string;
  venue: Venue;
  pick?: Pick;
  artists: Artist[];
  city: City;
  country: Country;
  private: boolean;
  __v: number;
}

export interface Artist {
  id: string;
  name: string;
  _id: ID;
}

export interface ID {
  $oid: string;
}

export enum City {
  London = "london",
}

export enum Country {
  Uk = "uk",
}

export interface Pick {
  id: string;
  blurb: string;
}

export interface Venue {
  id: string;
  name: string;
  contentUrl: null | string;
  live: boolean;
  direction: string;
}
