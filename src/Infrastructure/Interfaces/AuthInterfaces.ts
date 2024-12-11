export interface LoginResponse {
    id: number;
    refresh:   string;
    access:    string;
    name:      string;
    last_name: string;
    email:     string;
    avatar:    string;
    role:      string;
}

export interface Register {
    name: string;
    last_name: string;
    email: string;
    avatars: File | any;
}