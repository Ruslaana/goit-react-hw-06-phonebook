const { createSlice } = require('@reduxjs/toolkit');

const filterInitialState = {
  filter: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    setFilterSlice(state, { payload }) {
      state.filter = payload;
    },
  },
});

export const { setFilterSlice } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;