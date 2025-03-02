import { Card, CardResponse } from "@/types/card.types";
import axios from "axios";
import { create } from "zustand";

type CardState = {
  cards: Card[];
  loading: boolean;
  error: string | null;
  fetchCards: () => Promise<void>;
  addCard: (card: Card) => Promise<void>;
  updateCard: (id:string, card: Card) => Promise<void>;
  deleteCard: (id: string) => Promise<void>;
};

export const useCardsStore = create<CardState>((set) => ({
  cards: [],
  loading: false,
  error: null,

  // Fetch all cards
  fetchCards: async () => {
    try {
      set({ loading: true, error: null });
      const { data } = await axios.get<CardResponse>(
        `${process.env.VITE_API_URL}/api/businesscards`
      );
      set({ cards: data.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch cards", loading: false });
      console.error("Error fetching cards", error);
    }
  },

  addCard: async (card: Card) => {
    try {
      set({ loading: true, error: null });
      const { data } = await axios.post<{ data: Card }>(
        `${process.env.VITE_API_URL}/api/businesscards`,
        card
      );
      set((state) => ({ cards: [...state.cards, data.data], loading: false }));
    } catch (error) {
      set({ error: "Failed to add card", loading: false });
      console.error("Error adding card", error);
    }
  },

  updateCard: async (id: string, card: Card) => {
    try {
      set({ loading: true, error: null });
      const { data } = await axios.put<{ data: Card }>(
        `${process.env.VITE_API_URL}/api/businesscards/${id}`,
        card
      );
      set((state) => ({
        cards: state.cards.map((c) => (c.id === id ? data.data : c)),
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to update card", loading: false });
      console.error("Error updating card", error);
    }
  },

  // Delete a card
  deleteCard: async (id: string) => {
    try {
      set({ loading: true, error: null });
      await axios.delete<{ data: Card }>(
        `${process.env.VITE_API_URL}/api/businesscards/${id}`
      );
      set((state) => ({
        cards: state.cards.filter((c) => c.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to delete card", loading: false });
      console.error("Error deleting card", error);
    }
  }
}));
