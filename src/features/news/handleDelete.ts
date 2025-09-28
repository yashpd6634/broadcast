import type { PayloadAction } from "@reduxjs/toolkit";
import type { NewsState } from "./newsSlice";

const handleDelete = (
  state: NewsState,
  action: PayloadAction<{ id: number }>
) => {
  state.value = state.value.filter((item) => item.id !== action.payload.id);
};

export default handleDelete;
