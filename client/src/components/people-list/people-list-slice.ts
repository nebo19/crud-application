import { createSlice } from "@reduxjs/toolkit";

export interface PersonType {
  _id: string;
  id: number;
  name: string;
  surname: string;
  createdDate?: Date;
  city?: string;
  address?: string;
  phone?: string;
  editMode?: boolean;
}

export interface StateType {
  peopleListData: PersonType[];
  loading: boolean;
  error: any;
}

const initialState: StateType = {
  peopleListData: [],
  loading: false,
  error: null,
};

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    fetchPeopleStart(state) {
      state.loading = true;
    },
    fetchPeopleSuccess(state, action) {
      state.peopleListData = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchPeopleError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addPerson(state, action) {
      state.peopleListData = [...state.peopleListData, action.payload];
    },
    deletePerson(state, action) {
      state.peopleListData = state.peopleListData.filter(
        (person) => person._id !== action.payload
      );
    },
  },
});

export const {
  fetchPeopleStart,
  fetchPeopleSuccess,
  fetchPeopleError,
  deletePerson,
  addPerson,
} = peopleSlice.actions;

export default peopleSlice.reducer;
