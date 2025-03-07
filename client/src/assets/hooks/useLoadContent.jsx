import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { DataRequest } from "../../api/dataMovies";

export function useLoadContent(type, initialSeries = []) {
    const [movies, setMovies] = useState(initialSeries);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);

    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1; // Четем `page` от URL
    const [query, setQuery] = useState({});

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                setLoading(true);
                const data = await DataRequest(type, controller.signal, query.prYear, query.gteYear, query.lteYear, page, query.gteVote, query.lteVote);
                setMovies(data.results || []);
                setTotalPages(data.total_pages || 1);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError("Грешка при зареждане на съдържанието!");
                }
            } finally {
                setLoading(false);
            }
        })();

        return () => controller.abort();
    }, [type, page, query]);

    const searchContent = async (newQuery) => {
        setQuery(newQuery);
        setSearchParams({ page: 1 });
    };

    const setPage = (newPage) => {
        setSearchParams({ page: newPage });
    };

    return { movies, searchContent, loading, error, page, setPage, totalPages };
}
