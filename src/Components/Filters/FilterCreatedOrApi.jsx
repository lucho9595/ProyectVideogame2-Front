import React, {useState } from 'react';
import { useDispatch} from "react-redux";
import { filterCreatedOrApi } from "../../Redux/Actions.js";
import styles from "./FilterCreatedOrApi.module.css";

export default function FilterCreateDBOrApi() {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState("all");

    function handleSortByCreate(e) {
        dispatch(filterCreatedOrApi(e.target.value))
        setFilter(e.target.value)
    }

    return (
        <select value={filter} onChange={e => handleSortByCreate(e)} className={styles.select}> 
            <option value="all">Order DB/API</option>
            <option value="db">Created</option>
            <option value="api">Api</option>
        </select>
    )
}