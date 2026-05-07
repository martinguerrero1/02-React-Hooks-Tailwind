import { useState, useEffect } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setCargando(false);
      })
      .catch(() => {
        setError("No se pudieron cargar los posts.");
        setCargando(false);
      });
  }, []);

  return { posts, cargando, error };
}
