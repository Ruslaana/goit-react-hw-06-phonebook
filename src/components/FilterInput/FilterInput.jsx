// FilterInput.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { setFilter } from '../redux/contactsSlice';


import { Label, Input } from './FilterInput.styled';

const FilterInput = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.contacts.filter);

  const handleChangeFilter = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <Label>
      Знайти контакти за ім'ям
      <Input
        type="text"
        name="filter"
        placeholder="Введіть ім'я контакту"
        value={filter}
        onChange={handleChangeFilter}
      />
    </Label>
  );
};

FilterInput.propTypes = {
  value: PropTypes.string.isRequired,
};

export default FilterInput;
