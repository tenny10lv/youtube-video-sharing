import { Box, Button, CircularProgress, Container, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getListMovies } from "../../api/movies";
import { Movie } from "../../api/movies/typings";
import MovieItem from "../../components/MovieItem";
import SharedMovieNoti from "../../components/SharedMovieNoti";
import { AuthState, useAuth } from "../../context/AuthContext";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth() as AuthState;

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const { data } = await getListMovies();
      setMovies(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Container>
      <Box py={4}>
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <div>
            {user && (
              <Box display="flex" justifyContent="flex-end" mb={6}>
                <Link href="/share">
                  <Button variant="contained">Share a movie</Button>
                </Link>
              </Box>
            )}
            <div>
              {movies.map((movie) => (
                <MovieItem key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        )}
      </Box>
      <SharedMovieNoti />
    </Container>
  );
}
