import { UUID } from "crypto";
import { User } from "./user.types";

export interface Card {
    id: UUID;
    name: string;
    email: string;
    phone: string;
    company: string;
    created_at: Date | string;
    updated_at: Date | string;
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

// React Props Interfaces
export interface CardItemProps {
    card: Card;
    onEdit?: (card: Card) => void;
    onDelete?: (id: UUID) => void;
}

export interface CardListProps {
    cards: Card[];
    isLoading?: boolean;
    error?: string | null;
    onRefresh?: () => void;
    onCardSelect?: (card: Card) => void;
}

export interface CardFormProps {
    initialValues?: CardForm;
    onSubmit: (data: CardForm) => void;
    isSubmitting?: boolean;
    error?: string | null;
}

export interface CardDetailProps {
    card: Card;
    isLoading?: boolean;
    error?: string | null;
}