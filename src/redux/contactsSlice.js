import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    filter: '',
  },
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
    },
    initializeContacts: (state, action) => {
      state.contacts = action.payload;
    },
    saveContacts: (state, action) => {
      try {
        localStorage.setItem('contacts', JSON.stringify(state.contacts));
      } catch (error) {
        console.error('Error saving data to localStorage:', error);
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addContact, deleteContact, initializeContacts, saveContacts, setFilter } = contactsSlice.actions;

export default contactsSlice.reducer;
