import axios from "axios";
const endpoint = "http://localhost:3001/persons";

const getAll = () => axios.get(endpoint).then((res) => res.data);

const newPerson = (newObject) =>
  axios.post(endpoint, newObject).then((res) => res.data);

export default { getAll, newPerson };
