import React, {useState } from "react";
import { useDispatch} from "react-redux";
import { filterAlphabet } from "../../Redux/Actions.js";
import styles from "./FilterAlpha.module.css";

export default function FilterName({ setCurrentPage, setOrderName }) {
    const dispatch = useDispatch();

    function handleOrderName(e) {
        e.preventDefault()
        dispatch(filterAlphabet(e.target.value));
        setCurrentPage(1);
        setOrderName(`orderName ${e.target.value}`)
    }

    return (
        <select  onChange={e => handleOrderName(e)} className={styles.select}>
            <option value="all" className={styles.option}>Order Alpha</option>
            <option value="A-Z" className={styles.option}>Sort A-Z</option>
            <option value="Z-A" className={styles.option}>Sort Z-A</option>
        </select>
    )
}