import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import Section from './Section';
import ContactForm from './ContactForm';
import FilterInput from './FilterInput';
import ContactsList from './ContactsList';
import { addContact, initializeContacts, saveContacts } from '../redux/contactsSlice';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);

  useEffect(() => {
    try {
      const storedContacts = localStorage.getItem('contacts');
      if (storedContacts) {
        dispatch(initializeContacts(JSON.parse(storedContacts)));
      }
    } catch (error) {
      console.error('Error retrieving data from localStorage:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    try {
      localStorage.setItem('contacts', JSON.stringify(contacts));
      dispatch(saveContacts(contacts));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }, [contacts, dispatch]);

  const handleAddContact = (data) => {
    const newContact = {
      ...data,
      id: nanoid(),
    };

    const existingContact = contacts.find((contact) => contact.name === data.name);
    if (existingContact) {
      alert(`${data.name} - контакт вже існує`);
    } else {
      dispatch(addContact(newContact));
    }
  };

  const filter = useSelector((state) => state.contacts.filter);
  const filteredContacts = useSelector((state) =>
    state.contacts.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    )
  );

  return (
    <>
      <Section title="Contacts book">
        <ContactForm addContact={handleAddContact} />
      </Section>
      <Section title="Contacts">
        <FilterInput />
        <ContactsList contacts={filteredContacts} />
      </Section>
    </>
  );
};

export default App;
