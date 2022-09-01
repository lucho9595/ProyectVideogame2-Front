import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css"

export default function Card({ id, name, image, genres, rating, background_image, platform }) {

    return (
        <div className={styles.contain}>
            <img className={styles.img} src={image || background_image} alt="Videogame not found"  />
            <h3 className={styles.h3}>Name: {name.toLowerCase()}</h3>
            <h3 className={styles.h3}>Genre: {typeof genres[0] === "string" ? genres.join("  ") : genres?.map(e => `${e.name} `)}</h3>
            <h3 className={styles.h3}>Rating: {rating}</h3>
            <h3>Platform: {typeof platform[0] === "string" ? platform.join("  ") : platform?.map(e => `${e.name} `)}</h3>
            <Link to={`/videogame/${id}`}>
                <button className={styles.details} >Details</button>
            </Link>
        </div>
    )

};