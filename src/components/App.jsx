import { useState, useEffect } from 'react'
import Phonebook from './Phonebook/Phonebook'
import ContactList from './ContactList/ContactList'
import Filter from './Filter/Filter'
import { nanoid } from "nanoid";
import css from './App.module.css'

export const App = () => {
	// Использую хук useState для определения параметров состояния
	const [contacts, setContacts] = useState(
	// при загрузке передаю начальное состояние в виде коллбек функции 
	// которая выполняет проверку наличия данных в localStorage и в случае
	// их наличия они были загружены в переменную contacts либо загружает массив
	// дефолтных значений.
		() =>
		JSON.parse(window.localStorage.getItem('contacts')) ?? [
		  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
		  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
		  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
		  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
		]
	)
	const [filter, setFilter] = useState('')

	// Использую хук useEffect для того чтобы при изменении contacts 
	// массив записывался в localStorage. Аналог componentDidUpdate.
	useEffect(() => {
		window.localStorage.setItem('contacts', JSON.stringify(contacts))
	}, [contacts])

	// Функция для создания контакта. Принимает данные от формы в компоненте phoneBook
	const createContact = ({name, number}) => {
		// создание объекта нового контакта
		const newContact = {
			id: nanoid(),
			name,
			number
			}
		// проверка есть ли в массиве контактов контакт
		// с таким именем, т.е. препятствие добалению уже 
		// существующих контактов
		if (contacts.find(contact => 
			contact.name === newContact.name)) {
				alert(`${newContact.name} is already in contacts.`);
				return;
			}
		// функция принимает в себя предыдущее состояние и 
		// добавляет в него новый контакт путем деструктуризации
		// массива котактов и добаления нового элемента контакта	
		setContacts((prev) => {
			return [
				...prev,
				 newContact,
				]
			}
		)
	}

	// Функция изменения параметра для поиска контакта в массиве
	// принимает объект события, диструктуризирует его, достает значение
	// поля target и записывает в значение поля объекта состояния
	// значение target.value
	const changeFilter = ({ target }) => setFilter(target.value)

	// Функция removeContact удаляет контакт из массива контактов. Получает id 
	// контакта из компонента ContactList 
	// и методом filter возвращает все контакты у которых не совпадает id
	const removeContact = (id) => {
		setContacts((prev) => prev.filter((el) => el.id !== id))
	}
	// функция получения контактов для отображения
	const getVisibleContacts = () => {
		return contacts.filter( 
			contact => {
				const name = contact.name.toLowerCase(); 
				const search = filter.toLowerCase();
				return name.includes(search);
			} 
		)
	}

	return (
		<div className={css.container}>
			<h2>Phonebook</h2>
			<Phonebook 
				onSubmit={createContact}
			/>
			<h2>Contacts</h2>
			<Filter
				value={filter}
				onChange={changeFilter}
			/>
			<ContactList
				contacts={getVisibleContacts()}
				removeContact={removeContact}
			/>
		</div>
	)
}
