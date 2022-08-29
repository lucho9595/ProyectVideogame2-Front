import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getGenres, getPlatform, createdGame } from '../../Redux/Actions.js';
import styles from "./Form.module.css";

export default function Created() {
    const dispatch = useDispatch();
    const history = useHistory();
    const allGames = useSelector((state) => state.videogames)
    const genres = useSelector((state) => state.genres);
    const platform = useSelector((state) => state.platform)
    const [error, setError] = useState({});
    const [input, setInput] = useState({
        name: "",
        description: "",
        release: "",
        rating: "", //si es numero en 0
        image: "",
        genres: [],
        platform: [],
    });

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatform())
    }, [dispatch])

    //Aca realizamos la validacion:

    function validation(input) {
        let errors = {};
        if (allGames.find((game) => game.name.toLowerCase() === input.name.toLocaleLowerCase())) {
            errors.name = "That Games exists";
        }
        if (!/^[a-z\s]+$/.test(input.name)) { errors.name = "Only lower-case letters are accepted"; }
        if (input.name.length > 80) { errors.name = "Only Eighty characters"; }
        if (input.name === " ") { errors.name = "The first character is not space-bar"; }
        if (!input.name) { errors.name = "Name required"; }
        if (input.description.length < 180 || input.description.length > 1500) { errors.description = "Minium 180 characters"; }
        if (!Date.parse(input.release)) { errors.release = "Date of release is required"; }
        if (!input.rating) { errors.rating = "Rating is required"; }
        if (input.rating > 5 || input.rating < 1) { errors.rating = "Rating must range between 0 and 5"; }
        if (!/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/gi.test(input.image)) { errors.image = "The url is not valid"; }
        if (!input.genres.length) { errors.genres = "Select at least a one genres "; }
        if (!input.platform.length) { errors.platform = " Select at least a one platform"; }
        return errors;
    }

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(
            validation({
                ...input,
                [e.target.name]: e.target.value
            })
        )
    };

    function handleSelectG(e) {
        setInput({
            ...input,
            genres: [...new Set([...input.genres, e.target.value])],
        })
        setError(
            validation({
                ...input,
                genres: [...input.genres, e.target.value],
            })
        )
    };
    function handleSelectP(e) {
        setInput({
            ...input,
            platform: [...new Set([...input.platform, e.target.value])]
        })
        setError(
            validation({
                ...input,
                platform: [...input.platform, e.target.value]
            })
        )

    }

    function handleDelete(e, el) {
        e.preventDefault();
        setInput({
            ...input,
            genres: input.genres.filter(genre => genre !== el),
            platform: input.platform.filter(platform => platform !== el)
        });
        setError(
            validation({
                ...input,
                genres: input.genres.filter(genre => genre !== el),
                platform: input.platform.filter(platform => platform !== el)
            })
        )
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(createdGame(input))
        alert("Your game is created!")
        setError(validation(input))
        setInput({
            name: "",
            description: "",
            release: "",
            rating: "",
            image: "",
            genres: [],
            platform: [],
        })
        history.push('/home')
    }

    const [disabledButton, setDisabledButton] = useState(true);

    useEffect(() => {
        if (
            input.name === "" ||
            input.name.length > 80 ||
            /[^a-z\s]/.test(input.name) ||
            input.genres.length === 0 ||
            input.platform.length === 0 ||
            input.description.length < 180 ||
            input.description.length > 1500 ||
            input.description.length === 0 ||
            !input.release ||
            input.release > 10 ||
            input.rating.length < 1 ||
            input.rating.length > 5 ||
            !/[-a-zA-Z0-9@:%_.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_.~#?&//=]*)?/gi.test(input.image)
        ) {
            return (setDisabledButton(true));
        } else {
            return (setDisabledButton(false));
        }
    }, [error, input, setDisabledButton])


    return (
        <div>
            <div>
                <div className={styles.container}>
                    <div>
                        <Link to={'/home'}>
                            <button className={styles.back}>Back to Home</button>
                        </Link>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
                        <div>
                            <label className={styles.label}>Name:</label>
                            <input
                                type="text"
                                placeholder="Name..."
                                value={input.name}
                                name="name"
                                onChange={handleChange}
                                autoComplete="off"
                                className={styles.input}
                            />{!error.name ? null : (
                                <p className={styles.error}>❌{error.name}</p>
                            )}
                        </div>
                        <div>
                            <label className={styles.label}>Description:</label>
                            <textarea
                                placeholder="Write something here."
                                value={input.description}
                                name="description"
                                onChange={handleChange}
                                autoComplete="off"
                                className={styles.textarea}
                            />{error.description && (<p className={styles.error}>❌{error.description}</p>)}
                        </div>

                        <div>
                            <label className={styles.label}>Release:</label>
                            <input
                                type="date"
                                value={input.release}
                                name="release"
                                onChange={handleChange}
                                autoComplete="off"
                                className={styles.input}
                            />{error.release && (<p className={styles.error}>❌{error.release}</p>)}
                        </div>
                        <div>
                            <label className={styles.label}>Rating:</label>
                            <input
                                type="range"
                                value={input.rating || 0}
                                name="rating"
                                onChange={handleChange}
                                min="0"
                                max="5"
                                className={styles.input}
                            />{input.rating}
                            {error.rating && (<p className={styles.error}>❌{error.rating}</p>)}
                        </div>
                        <div>
                            <label className={styles.label}>Image:</label>
                            <input
                                type="text"
                                placeholder="The url of your image"
                                value={input.image}
                                name="image"
                                onChange={handleChange}
                                autoComplete="off"
                                className={styles.input}
                            />{error.image && (<p className={styles.error}> ❌{error.image}</p>)}
                        </div>
                        <div className={styles.content}>
                            <label className={styles.label}>Genre:</label>
                            <select className={styles.select} onChange={(e) => handleSelectG(e)}>
                                <option value="all" disable>All Genre</option>
                                {genres?.map((g, id) => (
                                    <option name={g.name} key={id}>{g.name}</option>
                                ))}
                            </select>
                            {error.genres && (<p className={styles.error}> ❌{error.genres}</p>)}
                        </div>
                        <div className={styles.divContain}>
                            {input.genres.map((g, id) =>
                                <div key={id} className={styles.divInfo}>
                                    <p className={styles.p}>{g}</p>
                                    <button className={styles.buttonP} onClick={(e) => handleDelete(e, g)}>X</button>
                                </div>
                            )}
                        </div>
                        <div>
                            <label className={styles.label}>Platform:</label>
                            <select className={styles.select} onChange={(e) => handleSelectP(e)}>
                            <option value="all" disable>All Platform</option>
                                {platform?.map((p, id) => (
                                    <option name={p.name} key={id}>{p.name}</option>
                                ))}
                            </select>
                            {error.platform && (<p className={styles.error}> ❌{error.platform}</p>)}
                        </div>
                        <div className={styles.divContain}>
                            {input.platform.map((p, id) =>
                                <div key={id} className={styles.divInfo}>
                                    <p className={styles.p}>{p}</p>
                                    <button className={styles.buttonP} onClick={(e) => handleDelete(e, p)}>X</button>
                                </div>
                            )}
                        </div>
                        <button disabled={disabledButton} type='submit' className={styles.submit}>Created Videogame</button>
                    </form>
                </div>
            </div>
        </div>
    )
};