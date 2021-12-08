export type registerType = {
  userId: string;
  email: string;
  password: string;
  fullname: string;
  address: string;
  isAdmin: boolean;
  urlImage: string;
};

export type loginType = {
  email: string;
  password: string;
};
