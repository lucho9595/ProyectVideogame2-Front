import {
    GET_VIDEOGAMES,
    GET_NAME,
    GET_GENRES,
    GET_DETAIL,
    // GET_PLATFORM,
    FILTER_GENRE,
    FILTER_CREATED_OR_API,
    FILTER_ALPHA,
    FILTER_RATING,    
    // FILTER_RELEASE,
    // FILTER_PLATFORM,
    POST_GAME,
    CLEAN_DETAIL,

} from "../Redux/Actions.js";

const initialState = {
    videogames: [],
    backUpVideogame: [],
    genres: [],
    platform: [],
    detail: {},
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        //traigo todos los videojuegos y creo otro estado aparte
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                backUpVideogame: action.payload,
            }
        //traigo todos los generos
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        //traigo los nombres
        case GET_NAME:
            return {
                ...state,
                videogames: action.payload === "Game not found" ? (alert("Game not found"), [...state.backUpVideogame]) : action.payload,
            }
        //me traigo los detalles de c/u
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        // case GET_PLATFORM:
        //     return {
        //         ...state,
        //         platform: action.payload,
        //     }
        //filtro por nombre para ordenar alfabeticamente
        case FILTER_ALPHA:
            let sortedVideogameName = action.payload === "A-Z" ? state.videogames.sort((a, b) => {
                if (a.name > b.name) return 1
                if (b.name > a.name) return -1
                return 0
            }) : state.videogames.sort((a, b) => {
                if (a.name > b.name) return -1
                if (b.name > a.name) return 1
                return 0
            })
            return {
                ...state,
                videogames: sortedVideogameName,
            }
        //filtro por nombre para ordenar por genero
        case FILTER_GENRE:
            const allGenre = state.backUpVideogame;
            const filterGenre = action.payload === "all" ? allGenre : allGenre.filter((e) => e.genres.map((ele) => ele.name).includes(action.payload))
            console.log(filterGenre)
            return {
                ...state,
                videogames: filterGenre.length > 0 ? filterGenre : (alert("There is no game with that genre"), [...state.videogames])
            }
        //filtro por nombre para traer los de la base de datos o los de la api
        case FILTER_CREATED_OR_API:
            const allGames = state.backUpVideogame;
            const filter = action.payload === "all" ? allGames : action.payload === "db" ? allGames.filter(e => e.createdInDb) : allGames.filter(e => !e.createdInDb)
            return {
                ...state,
                videogames: filter.length > 0 ? filter : (alert("There is not created game"), [...state.videogames])
            }
        case FILTER_RATING:
            let videogameRating = action.payload === "0-5" ? state.videogames.sort((a, b) => {
                if (a.rating > b.rating) return 1
                if (a.rating < b.rating) return -1
                return 0
            }) : state.videogames.sort((a, b) => {
                if (a.rating > b.rating) return -1
                if (a.rating < b.rating) return 1
                return 0
            })
            return {
                ...state,
                videogames: videogameRating
            }
        // case FILTER_PLATFORM:
        //     const allPlatform = state.backUpVideogame;
        //     const filterP = action.payload === "all" ? allPlatform : allPlatform.filter((p) => p.platform.includes(action.payload))
        //     console.log(filterP)
        //     return {
        //         ...state,
        //         videogames: filterP.length > 0 ? filterP : (alert("There ir not game with that platform"), [...state.videogames])
        //     }
        // case FILTER_RELEASE:
        //     const filterR = action.payload === "1980-01-01" ? state.videogames.sort((a, b) => {
        //         if (a.release > b.release) return 1
        //         if (a.release < b.release) return -1
        //         return 0
        //     }) : state.videogames.sort((a, b) => {
        //         if (a.release > b.release) return -1
        //         if (a.release < b.release) return 1
        //         return 0
        //     })
        //     return {
        //         ...state,
        //         videogames: filterR
        //     }
        case POST_GAME:
            return {
                ...state
            }
        //limpio el detalle
        case CLEAN_DETAIL:
            return {
                ...state,
                detail: {},
            }
        default:
            return state;
    }
}

export default rootReducer;