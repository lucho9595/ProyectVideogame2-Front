import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { filterPlatform, getPlatform } from "../../Redux/Actions.js";
import styles from "./FilterPlatform.module.css";

export default function FilterCreateDBOrApi({ setCurrentPage }) {
    const dispatch = useDispatch();
    const allPlatform = useSelector((state) => state.platform);

    useEffect(() => {
        dispatch(getPlatform())
    }, [dispatch])

    function handlePlatform(e) {
        e.preventDefault();
        dispatch(filterPlatform(e.target.value))
        setCurrentPage(1)
    }

    return (
        <select onChange={(e) => handlePlatform(e)} className={styles.select}>
        <option value="all">Type Platform</option>
        {allPlatform?.map((p) => {
            return <option key={p.id} value={p.name} >{p.name}</option>
        })}
    </select>)
}