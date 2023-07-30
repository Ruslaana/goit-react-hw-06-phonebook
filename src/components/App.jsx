import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import Section from './Section';
import ContactForm from './ContactForm';
import FilterInput from './FilterInput';
import ContactsList from './ContactsList';
import { addContact, initializeContacts, saveContacts } from '../redux/contactsSlice';

const App = () => {
  const dispatch = useDispatch();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      dispatch(initializeContacts(JSON.parse(storedContacts)));
    }
  }, [dispatch, setContacts]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    dispatch(saveContacts(contacts));
  }, [contacts, dispatch]);

  const addContact = (data) => {
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
      <Section title="Телефонна книга">
        <ContactForm addContact={addContact} />
      </Section>
      <Section title="Контакти">
        <FilterInput />
        <ContactsList contacts={filteredContacts} />
      </Section>
    </>
  );
};

export default App;
