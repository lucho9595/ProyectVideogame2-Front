import React, { useEffect } from 'react';
import { getDetail, cleanDetail } from '../../Redux/Actions';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading/Loading.jsx';
import styles from "./Details.module.css";

export default function Detail() {
    const dispatch = useDispatch();
    const videoGameDetail = useSelector((state) => state.detail);
    console.log(videoGameDetail)
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetail(id));
        return () => {
            dispatch(cleanDetail())
        }
    }, [dispatch, id])

    return (
        <div className={styles.background}>
            {
                videoGameDetail.length > 0 || videoGameDetail.name ?
                    <div key={videoGameDetail.id} className={styles.contain}>
                        <div className={styles.containInfo}>
                            <img className={styles.image} src={videoGameDetail.image || videoGameDetail[0].image} alt="Videogame_image" />
                            <h1 className={styles.name}>Name: {videoGameDetail.name || videoGameDetail[0].name}</h1>
                            <h4 className={styles.description}>Description: {videoGameDetail.description || videoGameDetail[0].description}</h4>
                            <h4 className={styles.genre}>Genre: {videoGameDetail.genres?.map(e => `${e.name} `) || videoGameDetail[0].genres.join(' - ')}</h4>
                            <h4 className={styles.release}>Release: {videoGameDetail.release || videoGameDetail[0].release}</h4>
                            <h4 className={styles.rating}>Rating: {videoGameDetail.rating || videoGameDetail[0].rating}</h4>
                            <h4 className={styles.platform}>Platform: {videoGameDetail.platform || videoGameDetail[0].platform.join(" - ")}</h4>
                        </div>
                        <div>
                            <Link to={'/home'}>
                                <button className={styles.button}>Back to Home</button>
                            </Link>
                        </div>
                    </div>
                    : <div><Loading /></div>}
        </div>
    );
};