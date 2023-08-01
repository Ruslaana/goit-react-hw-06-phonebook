import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { nanoid } from 'nanoid';

import Section from './Section';
import ContactForm from './ContactForm';
import FilterInput from './FilterInput/FilterInput';
import ContactsList from './ContactsList/ContactsList';

import { addContact, deleteContact } from '../redux/contactsSlice';
import { setFilterSlice } from '../redux/filterSlice';
import { getContacts, getFilter } from '../redux/selectors';

const App = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const addContact = (data) => {
    const newContact = { ...data, id: nanoid() };
    const existingContact = contacts.contacts.find((contact) => contact.name === data.name);
    if (existingContact) {
      alert(`${data.name} is a duplicate contact`);
    } else {
      dispatch(addContact(newContact));
    }
  };

  const deleteContact = (userId) => {
    dispatch(deleteContact(userId));
  };

  const handleChangeFilter = ({ target: { value } }) => {
    dispatch(setFilterSlice(value));
  };

  const getFilteredContacts = () => {
    return contacts.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.filter.toLowerCase())
    );
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm addContact={addContact} />
      </Section>
      <Section title="Contacts">
        <FilterInput value={filter.filter} onChangeFilter={handleChangeFilter} />
        <ContactsList contacts={getFilteredContacts()} delContact={deleteContact} />
      </Section>
    </>
  );
};

export default App;
