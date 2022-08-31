import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_NAME = "GET_NAME";
export const GET_GENRES = "GET_GENRES";
export const GET_DETAIL = "GET_DETAIL";
export const GET_PLATFORM = "GET_PLATFORM";
export const FILTER_GENRE = "FILTER_GENRE";
export const FILTER_CREATED_OR_API = "FILTER_CREATED_OR_API";
export const FILTER_ALPHA = "FILTER_ALPHA";
export const FILTER_RATING = "FILTER_RATING";
// export const FILTER_PLATFORM = "FILTER_PLATFORM";
// export const FILTER_RELEASE = "FILTER_RELEASE";
export const POST_GAME = "POST_GAME";
export const CLEAN_DETAIL = "CLEAN_DETAIL";

//aca me traigo todo lo de localhost hasta el post

export function getVideogames() {
    return async function (dispatch) {
        try {
            let videogames = await axios.get('http://localhost:3001/videogame')
            return dispatch({
                type: GET_VIDEOGAMES,
                payload: videogames.data
            })
        } catch (error) {
            console.log(error);
        }
    }
};

export function getName(payload) {
    return async function (dispatch) {
        try {
            let nameGames = await axios.get(`http://localhost:3001/videogame?name=${payload}`)
                return dispatch({
                    type: GET_NAME,
                    payload: nameGames.data
                })
        } catch (e) {
            console.log(e)
        }
    }
};

export function getGenres() {
    return async function (dispatch) {
        try {
            let genre = await axios.get(`http://localhost:3001/genre`)
            return dispatch({
                type: GET_GENRES,
                payload: genre.data
            })
        } catch (error) {
            console.log(error)
        }
    }

};

export function getDetail(id) {
    return async function (dispatch) {
        try {
            const details = await axios.get(`http://localhost:3001/videogame/${id}`)
            console.log(details)
            return dispatch({
                type: GET_DETAIL,
                payload: details.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function getPlatform() {
    return async function (dispatch) {
        try {
            const platform = await axios.get(`http://localhost:3001/platforms`)
            console.log(platform)
            return dispatch({
                type: GET_PLATFORM,
                payload: platform.data,
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function createdGame(payload) {
    return async function () {
        const created = await axios.post(`http://localhost:3001/videogame`, payload)
        return created
    }
}

//Aca van los filtros

export function filterGenre(payload) {
    return {
        type: FILTER_GENRE,
        payload,
    }
};

export function filterCreatedOrApi(payload) {
    return {
        type: FILTER_CREATED_OR_API,
        payload,
    }
}

export function filterAlphabet(payload) {
    return {
        type: FILTER_ALPHA,
        payload
    }
}

export function filterRating(payload) {
    return {
        type: FILTER_RATING,
        payload,
    }
}

// export function filterPlatform(payload){
//     return{
//         type: FILTER_PLATFORM,
//         payload,
//     }
// }

// export function filterRelease(payload){
//     return{
//         type: FILTER_RELEASE,
//         payload
//     }
// }

//Limpio el detalle

export function cleanDetail() {
    return async function (dispatch) {
        return dispatch({
            type: CLEAN_DETAIL
        })
    }
}