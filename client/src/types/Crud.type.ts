type Author = {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
};

export type Crud = {
  _id?: string;
  author?: Author;
  title: string;
  pages: number;
  genre: string;
};
