import { UUID } from "crypto";

export interface User {
    id: UUID;
    username: string;
    email: string;
    created_at: Date;
}

export interface UserResponse {
    data: User;
}