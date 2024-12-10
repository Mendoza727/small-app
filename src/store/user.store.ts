import { create } from "zustand";

interface UserState {
  refresh: string;
  access: string;
  name: string;
  last_name: string;
  email: string;
  avatar: string;
  role: string;
  changeUser: (
    name: string,
    last_name: string,
    email: string,
    avatar: string,
    access: string,
    role: string,
  ) => void;
}

export const useUserStore = create<UserState>()((set) => ({
    refresh: "",
    access: "",
    avatar: "",
    email: "",
    last_name: "",
    name: "",
    role: "",
    changeUser: (
    name: string,
    last_name: string,
    email: string,
    avatar: string,
    access: string,
    role: string
  ) => set(({
    name,
    last_name,
    email,
    avatar,
    access,
    role
  })),
}));
