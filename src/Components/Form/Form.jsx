import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getGenres, createdGame, getVideogames } from '../../Redux/Actions.js';
import styles from "./Form.module.css";

export default function Created() {
    const dispatch = useDispatch();
    const history = useHistory();
    const allGames = useSelector((state) => state.videogames)
    const genres = useSelector((state) => state.genres);
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
        dispatch(getVideogames())
    }, [dispatch])

    //Aca realizamos la validacion:

    function validation(input) {
        let errors = {};
        if (allGames.find((game) => game.name.toLowerCase() === input.name.toLocaleLowerCase())) {
            errors.name = "That Games exists";
        }
        if (!/^[a-z\s]+$/.test(input.name)) { errors.name = "Only lower-case letters are accepted"; }
        if (input.name.length > 15) { errors.name = "Only fifteen characters"; }
        if (input.name === " ") { errors.name = "The first character is not space-bar"; }
        if (!input.name) { errors.name = "Name required"; }
        if (input.description.length < 80) { errors.description = "Minium 80 characters"; }
        if (input.description.length > 255) { errors.description = "Max 255 characters"; }
        if (!Date.parse(input.release)) { errors.release = "Date of release is required"; }
        if (!input.rating) { errors.rating = "Rating is required"; }
        if (input.rating > 5 || input.rating < 0.1) { errors.rating = "Rating must range between 0 and 5"; }
        if (!/^(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.jpeg)(\?[^\s[",><]*)?/gi.test(input.image)) { errors.image = "The url is not valid"; }
        if (!input.genres.length) { errors.genres = "Select at least a one or five genres "; }
        if (input.platform.length === 0) { errors.platform = "Select one a platform" }
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
        if (input.genres.length === 5) {
            alert("You must put maximum 5 types")
        } else {
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
        }
    };

    function handleSelectP(e) {
        if (e.target.checked) {
            setInput({
                ...input,
                platform: [...new Set([...input.platform, e.target.value])],
            })
            setError(
                validation({
                    ...input,
                    platform: [...input.platform, e.target.value],
                })
            )
                ;
        } else if (!e.target.checked) {
            setInput({
                ...input,
                platform: [...input.platform.filter(p => p !== e.target.value)],
            });
            setError(
                validation({
                    ...input,
                    platform: [...input.platform.filter(p => p !== e.target.value)],
                })
            )
        }
    };

    function handleDelete(e, el) {
        e.preventDefault();
        setInput({
            ...input,
            genres: input.genres.filter(genre => genre !== el),
        });
        setError(
            validation({
                ...input,
                genres: input.genres.filter(genre => genre !== el),
            })
        )
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (!input.name) {
            return alert('Enter game name')
        }
        else if (input.name.length > 15) {
            return alert('Only fifteen characters')
        }
        else if (input.rating > 5 || input.rating < 0.1) {
            return alert('Select the rating between zero or five')
        }
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
            // input.name === "" ||
            // input.name.length > 15 ||
            // /[^a-z\s]/.test(input.name) ||
            input.genres.length === 0 ||
            input.platform.length === 0 ||
            input.description.length < 180 ||
            input.description.length > 1500 ||
            input.description.length === 0 ||
            !input.release ||
            input.release > 10 ||
            input.rating.length === 0 ||
            input.rating.length > 5 ||
            !/(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.jpeg)(\?[^\s[",><]*)?/gi.test(input.image)
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
                                min='1980-03-01'
                                max='2023-01-03'
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
                                step="0.1"
                                min="0"
                                max="6"
                                className={styles.input}
                            /><p className={styles.label}>{input.rating}</p>
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
                                <option hidden>Select Genre</option>
                                {genres?.sort().map((g, id) => {
                                    return <option key={id} value={g.name}>{g.name}</option>
                                })}
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
                            <input value="PlayStation" type="checkbox" onChange={handleSelectP} /><label>PlayStation</label>
                            <input value="PlayStation 2" type="checkbox" onChange={handleSelectP} /><label>PlayStation 2</label>
                            <input value="PlayStation 3" type="checkbox" onChange={handleSelectP} /><label>PlayStation 3</label>
                            <input value="PlayStation 4" type="checkbox" onChange={handleSelectP} /><label>PlayStation 4</label>
                            <input value="PlayStation 5" type="checkbox" onChange={handleSelectP} /><label>PlayStation 5</label>
                            <input value="Xbox One" type="checkbox" onChange={handleSelectP} /><label>Xbox One</label>
                            <input value="Pc" type="checkbox" onChange={handleSelectP} /><label>Pc</label>
                            <input value="Xbox Series S/X" type="checkbox" onChange={handleSelectP} /><label>Xbox Series S/X</label>
                            <input value="Nintendo Switch" type="checkbox" onChange={handleSelectP} /><label>Nintendo Switch</label>
                            <input value="Android" type="checkbox" onChange={handleSelectP} /><label>Android</label>
                            <input value="iOS" type="checkbox" onChange={handleSelectP} /><label>iOS</label>
                            <input value="Nintendo 3DS" type="checkbox" onChange={handleSelectP} /><label>Nintendo 3DS</label>
                            <input value="Nintendo DS" type="checkbox" onChange={handleSelectP} /><label>Nintendo DS</label>
                            <input value="Nintendo DSi" type="checkbox" onChange={handleSelectP} /><label>Nintendo DSi</label>
                            <input value="macOS" type="checkbox" onChange={handleSelectP} /><label>macOS</label>
                            <input value="Linux" type="checkbox" onChange={handleSelectP} /><label>Linux</label>
                            <input value="Xbox 360" type="checkbox" onChange={handleSelectP} /><label>Xbox 360</label>
                            <input value="Xbox" type="checkbox" onChange={handleSelectP} /><label>Xbox</label>
                            <input value="PS Vita" type="checkbox" onChange={handleSelectP} /><label>PS Vita</label>
                            <input value="PSP" type="checkbox" onChange={handleSelectP} /><label>PSP</label>
                            <input value="Wii U" type="checkbox" onChange={handleSelectP} /><label>Wii U</label>
                            <input value="GameCube" type="checkbox" onChange={handleSelectP} /><label>GameCube</label>
                            <input value="Game Boy" type="checkbox" onChange={handleSelectP} /><label>Game Boy</label>
                            {error.platform && (<p className={styles.error}> ❌{error.platform}</p>)}
                        </div>
                        <button disabled={disabledButton} type='submit' className={styles.submit}>Created Videogame</button>
                    </form>
                </div>
            </div>
        </div>
    )
};