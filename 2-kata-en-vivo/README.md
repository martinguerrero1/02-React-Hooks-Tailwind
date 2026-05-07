# Kata en Vivo — Clase 02: `useEffect` + Fetch de datos

> **Duración estimada:** 25-30 minutos  
> **Modalidad:** El instructor hace pair-programming con la clase. Todos codean al mismo tiempo.  
> **Objetivo:** Entender `useEffect` resolviendo el caso de uso más común en toda app real: cargar datos desde una API cuando el componente se monta.

---

## ¿Qué es `useEffect`?

`useEffect` le dice a React: **"ejecutá este código _después_ de que el componente se renderice"**.

Es el lugar correcto para:

- Llamar a una API (fetch)
- Suscribirse a un evento externo
- Interactuar con el DOM directamente

```jsx
useEffect(() => {
  // Este código corre después del render
}, []);
//  ^
//  Array de dependencias vacío = solo corre UNA vez (al montar el componente)
```

---

## El desafío

Vas a construir un componente `<ListaPosts />` que:

1. Cuando se monta, **fetcha posts** desde `https://jsonplaceholder.typicode.com/posts?_limit=5`
2. Mientras espera la respuesta, **muestra un mensaje de carga** ("Cargando posts...")
3. Cuando llegan los datos, **los renderiza en una lista** con título y cuerpo
4. Si algo falla, **muestra un mensaje de error**

---

## Paso a paso

### Paso 1 — Creá el componente con los 3 estados necesarios

```jsx
import { useState, useEffect } from "react";

function ListaPosts() {
  const [posts, setPosts] = useState([]); // los datos
  const [cargando, setCargando] = useState(true); // estado de carga
  const [error, setError] = useState(null); // error si algo falla

  // useEffect va aquí (Paso 2)

  // return va aquí (Paso 3)
}
```

> **¿Por qué 3 estados?** En cualquier fetch real siempre hay tres posibilidades: cargando, datos, o error. Este patrón lo vas a ver en todo proyecto.

---

### Paso 2 — Agregá el `useEffect` con el fetch

```jsx
useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
    .then((res) => res.json())
    .then((data) => {
      setPosts(data);
      setCargando(false);
    })
    .catch((err) => {
      setError("No se pudieron cargar los posts.");
      setCargando(false);
    });
}, []); // <- array vacío: solo corre al montar
```

> **¿Qué pasa sin el `[]`?** El efecto corre en cada render → loop infinito porque `setPosts` dispara un render → que dispara el efecto → que dispara un render... El array vacío lo evita.

---

### Paso 3 — Construí el return con los 3 casos

```jsx
return (
  <div className="max-w-xl mx-auto p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Posts recientes</h2>

    {/* Caso 1: cargando */}
    {cargando && (
      <p className="text-gray-400 text-center py-8">Cargando posts...</p>
    )}

    {/* Caso 2: error */}
    {error && <p className="text-red-500 text-center py-8">{error}</p>}

    {/* Caso 3: datos listos */}
    {!cargando && !error && (
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <h3 className="font-semibold text-gray-800 capitalize mb-1">
              {post.title}
            </h3>
            <p className="text-gray-500 text-sm line-clamp-2">{post.body}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
);
```

---

### Paso 4 — Usá el componente en `App`

```jsx
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ListaPosts />
    </div>
  );
}

export default App;
```

---

## Lo que acabas de aprender

| Concepto                  | Qué hace                                       |
| ------------------------- | ---------------------------------------------- |
| `useEffect(() => {}, [])` | Ejecuta código una vez al montar el componente |
| `useState([])`            | Guarda el array de datos que llegan del fetch  |
| `useState(true)`          | Controla cuándo mostrar el spinner de carga    |
| `useState(null)`          | Guarda el mensaje de error si el fetch falla   |
| `.map()` en el return     | Renderiza un elemento por cada item del array  |

---

## Desafío extra (si terminás antes)

Agregá un botón "Recargar" que vuelva a hacer el fetch al hacer clic.

**Pista:** Necesitás un estado extra `recargando` y agregar ese estado al array de dependencias del `useEffect`:

```jsx
const [recarga, setRecarga] = useState(0);

useEffect(() => {
  // el mismo fetch de antes
}, [recarga]); // ahora corre cada vez que cambia "recarga"

// El botón:
<button onClick={() => setRecarga(recarga + 1)}>Recargar</button>;
```

---

## Preguntas para reflexionar

1. ¿Por qué el fetch va dentro de `useEffect` y no directamente en el cuerpo del componente?
2. ¿Qué pasaría si el array de dependencias fuera `[posts]` en lugar de `[]`?
3. ¿Cómo mostrarías un spinner animado en lugar del texto "Cargando..."?
