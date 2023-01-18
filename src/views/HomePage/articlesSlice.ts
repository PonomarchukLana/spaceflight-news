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
  data: data[];
};

const initialState: articlesState = {
  status: 'idle',
  data: [],
};

export const getAllArticles = createAsyncThunk('articles/getArticles',
  async () => {
    const response = await axios.get("https://api.spaceflightnewsapi.net/v3/articles", { params: { _limit: 6 } })
    return response.data;
  }
);

export const filteredArticles = createAsyncThunk('articles/getFilteredArticles',
  async ({ queryParams }: { queryParams: string[] }) => {
    const responseByTitle = await axios.get("https://api.spaceflightnewsapi.net/v3/articles", {
      params: { title_contains: queryParams }, paramsSerializer: {
        indexes: null
      }
    })
    const responseBySummary = await axios.get("https://api.spaceflightnewsapi.net/v3/articles", {
      params: { summary_contains: queryParams }, paramsSerializer: {
        indexes: null
      }
    })
    return [...responseByTitle.data, ...responseBySummary.data];
  }
);

const articlesSlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllArticles.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(getAllArticles.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.data = action.payload;
    });

    builder.addCase(getAllArticles.rejected, (state) => {
      state.status = 'idle';
    });


    builder.addCase(filteredArticles.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(filteredArticles.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.data = action.payload.filter((value, index, self) => index === self.findIndex((t) => (t.id === value.id)));
      console.log(state.data)
    });

    builder.addCase(filteredArticles.rejected, (state) => {
      state.status = 'idle';
    });
  },
})
export default articlesSlice.reducer;