import { Card } from "@/types/card.types";
import axios from "axios";
import { create } from "zustand";

type CardState = {
  cards: Card[];
  loading: boolean;
  error: string | null;
  fetchCards: () => Promise<void>;
  addCard: (card: Card) => Promise<void>;
  updateCard: (id: string, card: Card) => Promise<void>;
  deleteCard: (id: string) => Promise<void>;
};

export const useCardsStore = create<CardState>((set) => ({
  cards: [],
  loading: false,
  error: null,

  fetchCards: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get<Card[]>(
        `${import.meta.env.VITE_API_URL}/api/businesscards`
      );
      const cards = response.data;
      console.log("Fetched cards:", cards);
      set({ cards, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch cards", loading: false });
      console.error("Error fetching cards", error);
    }
  },

  addCard: async (card: Card) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post<Card>(
        `${import.meta.env.VITE_API_URL}/api/businesscards`,
        card
      );
      const newCard = response.data;
      console.log("Added card:", newCard);
      set((state) => ({
        cards: [...state.cards, newCard],
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to add card", loading: false });
      console.error("Error adding card", error);
    }
  },

  updateCard: async (id: string, card: Card) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.put<Card>(
        `${import.meta.env.VITE_API_URL}/api/businesscards/${id}`,
        card
      );
      const updatedCard = response.data;
      console.log("Updated card:", updatedCard);
      set((state) => ({
        cards: state.cards.map((c) => (c.id === id ? updatedCard : c)),
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to update card", loading: false });
      console.error("Error updating card", error);
    }
  },

  deleteCard: async (id: string) => {
    try {
      set({ loading: true, error: null });
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/businesscards/${id}`
      );
      console.log("Deleted card with ID:", id);
      set((state) => ({
        cards: state.cards.filter((c) => c.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to delete card", loading: false });
      console.error("Error deleting card", error);
    }
  },
}));
