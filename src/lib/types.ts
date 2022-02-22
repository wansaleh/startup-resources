export type TResource = {
  id: string;
  Price: string;
  Description: string;
  Features: string;
  Category: string[];
  Twitter: string;
  URL: string;
  Name: string;
  // favicons: {
  //   url: string;
  //   size?: string;
  // }[];
};

export type TCategory = {
  name: string;
  count: number;
};
