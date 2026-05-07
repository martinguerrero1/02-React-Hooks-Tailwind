# Proyecto Semanal — Clase 02: Blog "Appwise" completo

> **Entrega:** Inicio de la Clase 03  
> **Forma de entrega:** Repositorio de GitHub con el link compartido en el canal de la clase.  
> **Objetivo principal:** Construir el diseño completo del blog Appwise en React + Tailwind CSS, separado en componentes, usando los datos del `App.jsx` de esta carpeta como punto de partida.

---

## ¿Qué es Appwise?

Appwise es un blog de desarrollo web y tecnología. El diseño ya está definido — tu trabajo es implementarlo fielmente en React usando Tailwind CSS.

La app tiene **5 pantallas/vistas**. Podés navegar entre ellas a mano cambiando lo que renderiza el `App.jsx` (sin react-router por ahora — eso viene en la próxima clase).

---

## Las 5 vistas que hay que construir

### Vista 1 — Home (`/`)

La página principal del blog. Tiene:

- **Navbar** con logo "Appwise", links (Inicio / Tendencias / Más populares / Nosotros) y botón "Entrar 👋"
- **Hero** con título grande ("Tu fuente de conocimiento sobre desarrollo web y tecnología"), subtítulo, y barra horizontal con filtros de categorías + buscador
- **Artículo destacado** a la izquierda (imagen grande, número "01.", categoría, título)
- **3 artículos secundarios** a la derecha (imagen pequeña, número "02.", categoría, título)
- **Sección "Artículos recientes"** con posts en formato lista (imagen + título + autor + categoría + descripción + "Leer más")

---

### Vista 2 — Blog / Lista de posts (`/blog`)

Lista completa de artículos con sidebar de filtros. Tiene:

- **Navbar** (igual al home)
- **Breadcrumb**: "Blog de Desarrollo"
- **Lista de posts** a la izquierda: cada post tiene imagen, título, "Escrito por [autor] en [categoría] [fecha]", descripción, "Leer más"
- **Sidebar** a la derecha con:
  - Buscador ("search a post...")
  - Filtros con checkboxes: Más recientes / Más populares / Tendencias / Más antiguos
  - Lista de categorías: Todas / Diseño Web / Desarrollo / Bases de Datos / Motores de Búsqueda / Marketing

---

### Vista 3 — Detalle de post (`/post/:slug`)

La página de un artículo individual. Tiene:

- **Navbar**
- **Columna principal** (izquierda): título del post, metadata (autor + categoría + fecha), imagen principal, contenido del artículo (varios párrafos)
- **Sidebar** (derecha):
  - Sección "Autor": avatar + nombre + descripción ("Apasionado por la tecnología...")
  - Galería pequeña con 2 fotos del autor
  - Sección "Acciones": ícono de bookmark (guardar post)
  - Sección "Categorías": mismas categorías de la Vista 2
  - Buscador
- **Sección de comentarios** (abajo del artículo):
  - Título "Comentarios"
  - Textarea + botón "Enviar"
  - Lista de comentarios existentes: avatar + username + "1 year ago" + enlace "eliminar" + texto del comentario

---

### Vista 4 — Login (`/login`)

Pantalla de inicio de sesión. Tiene:

- **Navbar**
- **Formulario centrado** en la pantalla:
  - Título "Iniciar sesión"
  - Input de email (placeholder "Correo electrónico")
  - Input de contraseña (placeholder "Contraseña")
  - Botón ancho "Entrar"
  - Texto "¿No tienes cuenta? Regístrate" con el link subrayado

---

### Vista 5 — Crear post (`/crear`)

Formulario para redactar un nuevo artículo. Tiene:

- **Navbar**
- Texto pequeño "Crear un nuevo post"
- **Título editable** — un `<h1>` grande con placeholder "Mi historia increíble"
- **Selector de categoría** (dropdown): General / Diseño Web / Desarrollo / etc.
- **Textarea de descripción** — placeholder "Una breve descripción"
- **Editor de contenido** con toolbar: Normal (selector de formato) / B / I / U / Link / Lista ordenada / Lista desordenada / Limpiar formato
- **Botón "Publicar"**

---

## Estructura de carpetas esperada

```
src/
├── App.jsx                  ← solo importa y compone las vistas
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx           ← si el diseño lo incluye
│   ├── PostCard.jsx         ← tarjeta de post reutilizable
│   ├── Sidebar.jsx          ← sidebar con buscador + categorías
│   └── CommentSection.jsx   ← sección de comentarios
├── views/
│   ├── Home.jsx
│   ├── Blog.jsx
│   ├── PostDetail.jsx
│   ├── Login.jsx
│   └── CreatePost.jsx
└── data/
    └── posts.js             ← array con los datos de los posts
```

---

## Reglas del proyecto

1. **No uses CSS propio.** Todo el estilo es con clases de Tailwind.
2. **Los posts se renderizan con `.map()`** desde un array de datos en `data/posts.js`.
3. **Cada componente recibe sus datos por props**, no los hardcodea internamente.
4. **El `useState` debe aparecer al menos dos veces** en el proyecto (ej: buscador, filtros, formulario de comentario, botón de seguir/guardar).
5. **Si llegaste a useEffect en clase**, usalo para simular la carga inicial de posts con un `setTimeout` de 1 segundo antes de mostrar la lista.

---

## Criterios de evaluación

| Criterio                                      | Puntos      |
| --------------------------------------------- | ----------- |
| Navbar reutilizable en todas las vistas       | 10 pts      |
| Vista Home completa (hero + grid + recientes) | 20 pts      |
| Vista Blog con sidebar y lista de posts       | 15 pts      |
| Vista Detalle con comentarios                 | 15 pts      |
| Vista Login con formulario                    | 10 pts      |
| Vista Crear Post con toolbar                  | 10 pts      |
| Posts renderizados con `.map()` desde array   | 10 pts      |
| `useState` usado en al menos 2 lugares        | 10 pts      |
| **Total**                                     | **100 pts** |

---

## Datos de referencia

El `App.jsx` de esta carpeta tiene la estructura base del blog. Usá los posts, categorías y comentarios que están ahí como datos de ejemplo para poblar las vistas.

Las imágenes de referencia de cada vista están en la carpeta `assets/` de la clase. Tenelas abiertas mientras trabajás para comparar tu resultado con el diseño esperado.
