import React from 'react';
import PropTypes from 'prop-types';

import { ContactItem, ContactName, ContactNumber, Button } from './ContactItem.styled';

import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';


const ContactsItem = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <ContactItem key={id}>
      <ContactName>
        {name}:<ContactNumber>{number}</ContactNumber>
      </ContactName>
      <Button onClick={handleDelete}>Delete</Button>
    </ContactItem>
  );
};

ContactsItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default ContactsItem;
