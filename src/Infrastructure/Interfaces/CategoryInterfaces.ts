export interface CategoryResponse {
    message: string;
    data:    Datum[];
}

export interface Datum {
    id:          number;
    name:        string;
    description: string;
}
