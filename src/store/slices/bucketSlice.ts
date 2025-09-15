import { createSlice } from "@reduxjs/toolkit";

export interface ICard {
  cards: number[];
}

const initialState: ICard = {
  cards: [],
}

const bucketSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    initCardsFromLocalStorage: (state) => {
      state.cards = JSON.parse(localStorage.getItem("cards") || "[]") || [];
    },
    addCard: (state, action) => {
      state.cards = state.cards.includes(action.payload) ? state.cards : [...state.cards, action.payload];
      localStorage.setItem("cards", JSON.stringify(state.cards));
    },
    removeCard: (state, action) => {
      state.cards = state.cards.filter((cardId) => cardId !== action.payload);
      localStorage.setItem("cards", JSON.stringify(state.cards));
    },
  },
});

export const { addCard, removeCard, initCardsFromLocalStorage } = bucketSlice.actions;

export default bucketSlice.reducer;