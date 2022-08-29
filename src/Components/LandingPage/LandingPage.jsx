import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
    return (
        <div className={styles.landingContainer}>
            <div className={styles.titleAndbtn}>
                <h1 className={styles.landingTitle}>Welcome the app VideoGames</h1>
                <h3 className={styles.landingTitle2}>Developed by Luciano Coronel</h3>
                <Link to="/home">
                    <button className={styles.button}>Get Home</button>
                </Link>
            </div>
            <div className="right">
                <a href="https://github.com/lucho9595" target="#">
                    <button className={styles.Git} />
                </a>
                <a href="https://www.linkedin.com/in/luciano-coronel-90503bb8/" target="#">
                    <button className={styles.LinkedIn} />
                </a>
                <a href="https://wa.me/5491137601819" target="#">
                    <button className={styles.WhatsApp} />
                </a>
            </div>
        </div>
    )
};