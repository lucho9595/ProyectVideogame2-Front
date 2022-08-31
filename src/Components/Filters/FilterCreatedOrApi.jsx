import React from 'react';
import { useDispatch} from "react-redux";
import { filterCreatedOrApi } from "../../Redux/Actions.js";
import styles from "./FilterCreatedOrApi.module.css";

export default function FilterCreateDBOrApi() {
    const dispatch = useDispatch();

    function handleSortByCreate(e) {
        dispatch(filterCreatedOrApi(e.target.value))
    }

    return (
        <select onChange={e => handleSortByCreate(e)} className={styles.select}> 
            <option value="all">Order DB/API</option>
            <option value="db">Created</option>
            <option value="api">Api</option>
        </select>
    )
}