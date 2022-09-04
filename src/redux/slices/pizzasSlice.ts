import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Sort } from "./filterSlice";

type PizzaItem = {
  id:string, 
  price:number, 
  title:string, 
  types:number[], 
  sizes:number[], 
  imageUrl:string, 
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState{
items: PizzaItem[];
status: Status;
}



const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, //loading | success|error
};

export type SearchPizzaParams = {
  sortBy: string, 
  order: string, 
  category: string, 
  search: string, 
  currentPage: string
}

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://630134ece71700618a361148.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);

export const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<PizzaItem[]>) => {
      state.items = action.payload;
    },
  },


  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    })

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    })

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    })
  },

  // extraReducers: {
  //   [fetchPizzas.pending]: (state, action) => {
  //     state.status = "loading";
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = "success";
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     state.status = "error";
  //     state.items = [];
  //   },
  // },
});

export const selectPizzaData = (state: RootState) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
