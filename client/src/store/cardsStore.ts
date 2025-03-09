import { Card } from "@/types/card.types";
import axios from "axios";
import { create } from "zustand";

// Ensure API URL is set or provide a fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
      console.log("Fetching cards from:", `${API_URL}/api/businesscards`);
      const response = await axios.get<Card[] | { data: Card[] }>(
        `${API_URL}/api/businesscards`
      );
      
      // Handle both array and object with data property
      let cards = Array.isArray(response.data) 
        ? response.data 
        : (response.data as { data: Card[] }).data || [];
      
      // Ensure dates are properly formatted
      cards = cards.map(card => ({
        ...card,
        created_at: card.created_at || new Date().toISOString(),
        updated_at: card.updated_at || new Date().toISOString()
      }));
      
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
      
      // Ensure dates are properly formatted
      const cardWithFormattedDates = {
        ...card,
        created_at: card.created_at || new Date().toISOString(),
        updated_at: card.updated_at || new Date().toISOString()
      };
      
      const response = await axios.post<Card | { data: Card }>(
        `${API_URL}/api/businesscards`,
        cardWithFormattedDates
      );
      
      // Handle both direct object and object with data property
      const newCard = 'data' in response.data 
        ? (response.data as { data: Card }).data 
        : response.data;
      
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
      
      // Ensure dates are properly formatted
      const cardWithFormattedDates = {
        ...card,
        created_at: card.created_at || new Date().toISOString(),
        updated_at: card.updated_at || new Date().toISOString()
      };
      
      const response = await axios.put<Card | { data: Card }>(
        `${API_URL}/api/businesscards/${id}`,
        cardWithFormattedDates
      );
      
      // Handle both direct object and object with data property
      const updatedCard = 'data' in response.data 
        ? (response.data as { data: Card }).data 
        : response.data;
      
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
        `${API_URL}/api/businesscards/${id}`
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
