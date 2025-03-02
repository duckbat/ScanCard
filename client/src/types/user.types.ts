import { UUID } from "crypto";

export interface User {
    id: UUID;
    username: string;
    email: string;
    password: string;
    created_at: Date;
}

export interface UserForm {
    username: string;
    email: string;
    password: string;
}

export interface UserResponse {
    data: User[];
}