import { useState } from "react";

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

  const onInputChange = (e, setTarget) => {
    setTarget(e.target.value);
  };

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
      <div>
        filter shown with{" "}
        <input value={filter} onChange={(e) => onInputChange(e, setFilter)} />
      </div>
      <form onSubmit={onNewNameSubmit}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={(e) => onInputChange(e, setNewName)}
          />
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
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
