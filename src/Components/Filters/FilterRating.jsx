import React, {useState } from "react";
import { useDispatch} from "react-redux";
import { filterRating } from "../../Redux/Actions.js";
import styles from "./FilterRating.module.css";

export default function FilterName({ setCurrentPage, setOrderName }) {
    const dispatch = useDispatch();
    const [filter1, setFilter1] = useState("all");

    function handleOrderName(e) {
        e.preventDefault()
        dispatch(filterRating(e.target.value));
        setCurrentPage(1);
        setOrderName(`orderName ${e.target.value}`)
        setFilter1(e.target.value)
    }

    return (
        <select value={filter1}  onChange={e => handleOrderName(e)} className={styles.select}>
            <option value="all">Order Rating</option>
            <option value="0-5">Sort 0-5</option>
            <option value="5-0">Sort 5-0</option>
        </select>
    )
}