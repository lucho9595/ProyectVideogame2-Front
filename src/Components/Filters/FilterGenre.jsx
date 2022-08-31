import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { filterGenre, getGenres} from "../../Redux/Actions.js";
import styles from "./FilterGenre.module.css";

export default function FilterCreateDBOrApi({ setCurrentPage }) {
    const dispatch = useDispatch();
    const allGenres = useSelector((state) => state.genres);

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    function handleGenre(e) {
        e.preventDefault();
        dispatch(filterGenre(e.target.value))
        setCurrentPage(1)
    }

    return (
        <select  onChange={(e) => handleGenre(e)} className={styles.select}>
            <option value="all">Type Genre</option>
            {
                allGenres?.map((gn) => {
                    return <option value={gn.name} key={gn.id}>{gn.name}</option>
                })
            }
        </select>)
}