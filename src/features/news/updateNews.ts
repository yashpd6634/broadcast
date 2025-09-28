import type { PayloadAction } from "@reduxjs/toolkit";
import type { NewsState } from "./newsSlice";

const updateNews = (
  state: NewsState,
  action: PayloadAction<{ id: number; newsContent: string }>
) => {
  state.value = state.value.map((item) =>
    item.id === action.payload.id
      ? { ...item, newsContent: action.payload.newsContent }
      : item
  );
};

export default updateNews;
