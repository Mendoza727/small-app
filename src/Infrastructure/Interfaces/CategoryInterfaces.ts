export interface CategoryResponse {
    message: string;
    data:    Category[];
}

export interface Category {
    id:          number;
    name:        string;
    description: string;
}
