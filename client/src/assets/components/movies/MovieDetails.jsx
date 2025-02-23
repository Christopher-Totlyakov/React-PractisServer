import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieDetailsByID } from "../../../api/dataMovies"

import style from "./MovieDetails.module.css"

export default function MovieDetails() {
    const [movieDetails, setMovieDetails] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                const response = await movieDetailsByID(controller.signal, id);
                setMovieDetails(response);
                console.log(response);
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Грешка при зареждането на филма:", error);
                }
            }
        })();

        return () => controller.abort();
    }, [id]);


    return (
        <>
            <div className={style['imgBackdropConteiner']} >
                <div
                    className={style['imgBackdrop']}
                    style={{ '--backdrop-img': `url(https://image.tmdb.org/t/p/w1920${movieDetails.backdrop_path})`}}>

                </div>
            </div>
            <h1>{movieDetails.title}</h1>
            <h1>{movieDetails.title}</h1>
            <h1>{movieDetails.title}</h1>
            <h1>{movieDetails.title}</h1>
            <h1>{movieDetails.title}</h1>
            <h1>{movieDetails.title}</h1>
            <h1>{movieDetails.title}</h1>
            <h1>{movieDetails.title}</h1>
            <h1>{movieDetails.title}</h1>
            <h1>{movieDetails.title}</h1>
            <h1>{movieDetails.title}</h1>
            <h1>{movieDetails.title}</h1>
        </>

    );
}