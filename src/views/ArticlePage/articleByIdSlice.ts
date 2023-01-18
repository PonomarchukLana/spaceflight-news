import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface event {
  id: string;
  provider: string;
};

interface data {
  events: [] | event[];
  featured: boolean;
  id: number;
  imageUrl: string;
  launches: [] | event[];
  newsSite: string;
  publishedAt: string;
  summary: string;
  title: string;
  updatedAt: string;
  url: string;
};
interface articlesState {
  status: 'idle' | 'fulfilled' | 'loading';
  data: data | null;
};

const initialState: articlesState = {
  status: 'idle',
  data: null,
};

export const getArticleById = createAsyncThunk('articles/getArticleById',
  async ({id}: { id: number }) => {
    const response = await axios.get(`https://api.spaceflightnewsapi.net/v3/articles/${id}`)
    return response.data;
  }
);

const articleByIdSlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getArticleById.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(getArticleById.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.data = action.payload;
    });

    builder.addCase(getArticleById.rejected, (state) => {
      state.status = 'idle';
    });
  },
})
export default articleByIdSlice.reducer;