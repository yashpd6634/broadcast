import type { PayloadAction } from "@reduxjs/toolkit";
import type { NewsState } from "./newsSlice";

const addComment = (
  state: NewsState,
  action: PayloadAction<{ id: number; comment: string }>
) => {
  state.value = state.value.map((item) =>
    item.id === action.payload.id
      ? {
          ...item,
          comments: [
            ...item.comments,
            {
              id: Date.now(),
              content: action.payload.comment,
            },
          ],
        }
      : item
  );
};

export default addComment;
