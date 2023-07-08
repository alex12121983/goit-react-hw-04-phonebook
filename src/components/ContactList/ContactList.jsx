import React from 'react';
import ContactItem from '../ContactItem/ContactItem'
import PropTypes from "prop-types";
import css from './ContactList.module.css'

const ContactList = ({contacts, removeContact}) => {
    return (
        <ul className={css.list_group}>
            {contacts?.map(contact => (
                <ContactItem 
                    key={contact.id}
                    contact={contact}
                    removeContact={removeContact}
                />
            ))}
        </ul>
    )
}

export default ContactList

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      }).isRequired
    ),
    removeContact: PropTypes.func.isRequired,
  };
