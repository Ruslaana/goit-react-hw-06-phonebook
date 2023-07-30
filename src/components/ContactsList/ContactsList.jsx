import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import ContactsItem from '../ContactItem/ContactItem'; 

import { List } from './ContactsList.styled';


const ContactsList = () => {
  const contacts = useSelector((state) => state.contacts.contacts);

  return (
    <List>
      {contacts.map(({ name, number, id }) => (
        <ContactsItem key={id} id={id} name={name} number={number} />
      ))}
    </List>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ),
};

export default ContactsList;
