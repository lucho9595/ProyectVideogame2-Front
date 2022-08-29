import React from "react";
import img from "./loading.gif";
import styles from "./Loading.module.css";

export default function Loading(){
    return(
        <div className={styles.contain}>
            <img className={styles.background} src={img} alt="loading" />
        </div>
    )
}