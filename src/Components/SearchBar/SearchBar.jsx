import React, { useState } from "react";
import { getName} from "../../Redux/Actions.js";
import { useDispatch} from "react-redux";
import styles from "./SearchBar.module.css";

export default function SearchBar({ setCurrentPage }) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    //cambia el estado del name cada vez que ingreso una nueva busqueda
    function handleinputChange(e) {
        e.preventDefault();
        setName(e.target.value)
    }
    //cuando apretamos enter este busca el nombre
    function handleEnter(e) {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    }
    //cuando se apreta el search se realiza la busqueda
    function handleSubmit(e) {
    e.preventDefault();
    !name ? alert("Enter your game"):
    dispatch(getName(name.toLowerCase()))
    setName("")
    setCurrentPage(1)
    }

    return (
        <div>
            <input className={styles.input} value={name} type="text" placeholder="Search your videogame" onKeyPress={handleEnter} onChange={(e) => handleinputChange(e)} />
            <button className={styles.button} type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
};