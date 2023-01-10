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
}

export interface StateType {
  peopleListData: PersonType[];
  loading: boolean;
}

const initialState: StateType = {
  peopleListData: [],
  loading: false,
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
    },
    addPerson(state, action) {
      state.peopleListData = [...state.peopleListData, action.payload];
    },
    editPerson(state, action) {
      state.peopleListData = state.peopleListData.map((person) =>
        person.id === action.payload.id ? action.payload : person
      );
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
  deletePerson,
  addPerson,
  editPerson,
} = peopleSlice.actions;

export default peopleSlice.reducer;
