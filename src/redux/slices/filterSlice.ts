import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";


export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export type Sort = {
  name:string;
  sortProperty: SortPropertyEnum;
}

export interface FilterSliceState {
  searchValue: string;
  activeCategory: number;
  currentPage: number;
  activeSort: Sort,
}

const initialState: FilterSliceState = {
  searchValue: "",
  activeCategory: 0,
  currentPage: 1,
  activeSort: { name: "популярности", sortProperty: SortPropertyEnum.PRICE_DESC },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<number>) => {
      state.activeCategory = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setActiveSort: (state, action: PayloadAction<Sort>) => {
      state.activeSort = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      state.activeSort = action.payload.activeSort;
      state.activeCategory = Number(action.payload.activeCategory);
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

export const selectSort = (state: RootState) => state.filter.activeSort;
export const selectFilter = (state: RootState) => state.filter;

export const {
  setActiveCategory,
  setActiveSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
