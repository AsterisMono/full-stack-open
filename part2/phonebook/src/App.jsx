import { useState } from "react";
import { useEffect } from "react";
import personService from "./services/persons";
const onInputChange = (e, setTarget) => {
  setTarget(e.target.value);
};
const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={filter} onChange={(e) => onInputChange(e, setFilter)} />
    </div>
  );
};
const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  onNewNameSubmit,
}) => (
  <form onSubmit={onNewNameSubmit}>
    <div>
      name:{" "}
      <input value={newName} onChange={(e) => onInputChange(e, setNewName)} />
    </div>
    <div>
      number:{" "}
      <input
        value={newNumber}
        onChange={(e) => onInputChange(e, setNewNumber)}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);
const Person = ({ person, deletePerson }) => {
  return (
    <p>
      {person.name} {person.number}{" "}
      <button onClick={deletePerson}>delete</button>
    </p>
  );
};
const Persons = ({ persons, onPersonDelete }) => {
  return persons.map((person) => (
    <Person
      person={person}
      key={person.id}
      deletePerson={() => onPersonDelete(person)}
    />
  ));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);

  const filteredPersons =
    filter !== ""
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
      : persons;

  const onNewNameSubmit = (e) => {
    e.preventDefault();
    if (persons.map((p) => p.name).includes(newName)) {
      const choice = confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (choice) {
        personService
          .editPerson({
            ...persons.find((person) => person.name === newName),
            number: newNumber,
          })
          .then((editedPerson) =>
            setPersons(
              persons.map((p) => (p.id !== editedPerson.id ? p : editedPerson))
            )
          );
      }
      return;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    personService.newPerson(newPerson).then((createdPerson) => {
      setPersons([...persons, createdPerson]);
      setNewName("");
      setNewNumber("");
    });
  };

  const onPersonDelete = (deletedPerson) => {
    const choice = confirm(`Delete ${deletedPerson.name}?`);
    if (choice) {
      personService
        .deletePerson(deletedPerson.id)
        .catch(() => {
          alert(`the person ${deletedPerson.name} is already deleted`);
        })
        .finally(() => {
          setPersons(persons.filter((person) => person.id != deletedPerson.id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new person</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        onNewNameSubmit={onNewNameSubmit}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onPersonDelete={onPersonDelete} />
    </div>
  );
};

export default App;
