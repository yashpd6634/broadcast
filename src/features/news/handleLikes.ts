import type { PayloadAction } from "@reduxjs/toolkit";
import type { NewsState } from "./newsSlice";

const handleLikes = (
  state: NewsState,
  action: PayloadAction<{ id: number }>
) => {
  state.value = state.value.map((items) =>
    items.id === action.payload.id
      ? { ...items, likes: items.likes + 1 }
      : items
  );
};

export default handleLikes;
