import { createSlice } from "@reduxjs/toolkit";
import addNewsReducer from "./addNews";
import handleLikesReducer from "./handleLikes";
import handleDeleteReducer from "./handleDelete";
import updateNewsReducer from "./updateNews";
import addCommentReducer from "./addComment";

export interface Comment {
  id: number;
  content: string;
}

export interface News {
  id: number;
  headline: string;
  newsContent: string;
  likes: number;
  comments: Comment[];
}

export interface NewsState {
  value: News[];
}

const initialState: NewsState = {
  value: [],
};

export const newsSlice = createSlice({
  name: "news-features",
  initialState,
  reducers: {
    addNews: addNewsReducer,
    handleLikes: handleLikesReducer,
    handleDelete: handleDeleteReducer,
    updateNews: updateNewsReducer,
    addComment: addCommentReducer,
  },
});

export const { addNews, handleLikes, handleDelete, updateNews, addComment } =
  newsSlice.actions;

export default newsSlice.reducer;
