import { useState } from "react";
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
const Person = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};
const Persons = ({ persons }) => {
  return persons.map((person) => <Person person={person} key={person.id} />);
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const filteredPersons =
    filter !== ""
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
      : persons;

  const onNewNameSubmit = (e) => {
    e.preventDefault();
    if (persons.map((p) => p.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName("");
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
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
