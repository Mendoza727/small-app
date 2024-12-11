import { create } from "zustand";

interface UserState {
  id: number;
  refresh: string;
  access: string;
  name: string;
  last_name: string;
  email: string;
  avatar: string;
  role: string;
  changeUser: (
    id: number,
    name: string,
    last_name: string,
    email: string,
    avatar: string,
    access: string,
    role: string
  ) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  id: 0,
  refresh: "",
  access: "",
  avatar: "",
  email: "",
  last_name: "",
  name: "",
  role: "",
  changeUser: (
    id: number,
    name: string,
    last_name: string,
    email: string,
    avatar: string,
    access: string,
    role: string
  ) =>
    set({
      id,
      name,
      last_name,
      email,
      avatar,
      access,
      role,
    }),
}));
