import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Phonebook.module.css'

const Phonebook = ({onSubmit}) => {
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    const handleChange = (evt) => {
        switch (evt.target.name) {
            case 'name':
                setName( evt.target.value )
                break;
            case 'number':
                setNumber( evt.target.value )
                break;
            default:
                break;
        }
    }
    const handleSubmit = (evt) => {
        evt.preventDefault()
        onSubmit({ name, number })
        reset()
    }
    const reset = () => {
        setName('')
        setNumber('')
    }
    return (
        <form className={css.phonebook} onSubmit={handleSubmit}>
            <div className={css.phonebook_input}>
                <label 
                    htmlFor="inputName" 
                    className="form-label"
                >
                    Name
                </label>
                <input 
                    name="name"
                    type="text" 
                    className={css.form_control} 
                    id="inputName" 
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    aria-describedby="nameHelp"
                    onChange={handleChange}
                    value={name}
                />
            </div>
            <div className={css.phonebook_input}>
                <label 
                    htmlFor="inputNumber" 
                    className={css.form_label}
                >
                    Number
                </label>
                <input 
                    name="number"
                    type="tel" 
                    className={css.form_control} 
                    id="inputNumber" 
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    aria-describedby="numberHelp"
                    onChange={handleChange}
                    value={number}
                />
            </div>
            <button 
                type="submit" 
                className={css.btn_primary}
                disabled={ !name || !number }
            >
                Add contact
            </button>
        </form>
    )
}

export default Phonebook

Phonebook.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };