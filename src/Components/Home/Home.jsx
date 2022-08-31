import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination.jsx";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import FilterAlpha from "../Filters/FilterAlpha.jsx";
import FilterGenre from "../Filters/FilterGenre.jsx";
import FilterRating from "../Filters/FilterRating.jsx";
import FilterCreatedOrApi from "../Filters/FilterCreatedOrApi.jsx";
import Card from "../Card/Card.jsx";
import Loading from "../Loading/Loading.jsx"
import {getVideogames } from "../../Redux/Actions"; //filterPlatform, filterRelease, getPlatform, 
import styles from "./Home.module.css";

export default function Home({ setName }) {
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames)
    // const platform = useSelector((state) => state.platform)
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamePerPage, setVideogamePerPage] = useState(15);
    const indexLastGame = currentPage * videogamePerPage;
    const indexFirstGame = indexLastGame - videogamePerPage;
    const newLocal = allVideogames?.slice(indexFirstGame, indexLastGame);
    const currentVideogame = newLocal;

    const [orderName, setOrderName] = useState("");


    const pagination = (pageNum) => {
        setCurrentPage(pageNum);
    }

    useEffect(() => {
        dispatch(getVideogames())
        // dispatch(getPlatform())
    }, [dispatch])

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getVideogames());
        setTimeout(() => { }, 1000);
        setCurrentPage(1);
        setOrderName('');
    }

    // function handlePlatform(e) {
    //     e.preventDefault();
    //     dispatch(filterPlatform(e.target.value))
    //     setCurrentPage(1)
    // }

    // function handleOrderRelase(e) {
    //     e.preventDefault()
    //     dispatch(filterRelease(e.target.value));
    //     setCurrentPage(1);
    //     setOrderName(`orderName ${e.target.value}`)
    // }

    return (
        <div className={styles.contain}>
            <div className={styles.con}>
                <Link to="/">
                    <span className={styles.home}>Go Back</span>
                </Link>
                <Link to={"/new"}>
                    <span className={styles.create}>Create Videogame</span>
                </Link>
            </div>
            <div className={styles.search}>
                <SearchBar setCurrentPage={setCurrentPage} />
            </div>
            <div className={styles.topnav}>
                <div>
                    <button className={styles.button} onClick={(e) => handleSubmit(e)}>Refresh All</button>
                </div>
                <div className={styles.filter}>
                    <FilterAlpha setCurrentPage={setCurrentPage} setOrderName={setOrderName} />
                </div>
                <div className={styles.filter}>
                    <FilterCreatedOrApi />
                </div>
                <div className={styles.filter}>
                    <FilterRating setCurrentPage={setCurrentPage} setOrderName={setOrderName} />
                </div>
                <div className={styles.filter}>
                    <FilterGenre setCurrentPage={setCurrentPage} />
                </div>
                {/* <div>
                    <select onChange={(e) => handlePlatform(e)}>
                        <option value="all">Type Platform</option>
                        {platform?.map((p) => {
                            return <option key={p.id} value={p.name} >{p.name}</option>
                        })}
                    </select>
                </div>
                <div>
                    <select onChange={handleOrderRelase}>
                        <option value="all">Order Release</option>
                        <option value="1980-01-01">Sort 1980-01-01</option>
                        <option value='2023-01-03'>2023-01-03</option>
                    </select>

                </div> */}
            </div>
            <div>
                <Pagination
                    videogamePerPage={videogamePerPage}
                    allVideogames={allVideogames.length}
                    pagination={pagination}
                />
            </div>
            <div className={styles.cards}>
                {currentVideogame.length ?
                    currentVideogame && currentVideogame.map((videogame, id) => {
                        return (
                            <div key={id}>
                                <Card {...videogame} />
                            </div>
                        )
                    })
                    : <div>
                        <Loading />
                    </div>}
            </div>
        </div>
    )
}