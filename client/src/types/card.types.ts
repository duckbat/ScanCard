import { UUID } from "crypto";
import { User } from "./user.types";

export interface Card {
    id: UUID;
    name: string;
    email: string;
    phone: string;
    company: string;
    created_at: Date;
    updated_at: Date;
    user_id: string;
    user: User;
}

export interface CardForm {
    name: string;
    email: string;
    phone: string;
    company: string;
}

export interface CardResponse {
    data: Card[];
}