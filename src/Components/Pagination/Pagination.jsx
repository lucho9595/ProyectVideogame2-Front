import React from "react";
import styles from "../Pagination/Pagination.module.css"

export default function Paginado({videogamePerPage, allVideogames, pagination}){
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(allVideogames/videogamePerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul className={styles.paginationContainer}>
                {
                  pageNumbers && pageNumbers.map( num =>{
                      return(
                            <li className={styles.paginationList} key={num}>
                                <button className={styles.paginationBtn} onClick={() => pagination(num)}>{num}</button>
                            </li>
                        )   
                    })
                }
            </ul>
        </nav>
        
    )
  
}