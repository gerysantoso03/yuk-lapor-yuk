export type registerType = {
  userId: string;
  email: string;
  password: string;
  fullname: string;
  address: string;
  isAdmin: boolean;
};

export type loginType = {
  email: string;
  password: string;
};
