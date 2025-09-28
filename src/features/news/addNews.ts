import type { PayloadAction } from "@reduxjs/toolkit";
import type { News, NewsState } from "./newsSlice";

const addNews = (state: NewsState, action: PayloadAction<News>) => {
  state.value.push(action.payload);
};

export default addNews;
