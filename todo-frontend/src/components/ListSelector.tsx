import { useState, useEffect } from "react";
import "./../index.css";
import Select from "react-select";
import {getData} from "../Services/api";

function ListSelector() {
  const [lists, setLists] = useState([]);
const [selectedList, setSelectedList] = useState()

  useEffect(() => {
    const fetchLists = async () => {
    //   const result = await getData('localhost/5078/TodoList');
    };

    fetchLists();
  }, []);

  return (
    <div>
      <p>
        Select todo list:
        <Select options={lists} />
      </p>
    </div>
  );
}

export default ListSelector;
