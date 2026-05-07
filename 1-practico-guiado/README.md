# Práctico Guiado — Clase 02: `useState` + Tailwind CSS

> **Modalidad:** El instructor codea en vivo. Los alumnos replican en tiempo real.  
> **Duración estimada:** 40-50 minutos  
> **Lo que construimos:** El contador roto vs funcional para entender `useState`, + exploración visual de las utilidades clave de Tailwind CSS.

---

## Objetivos de esta práctica

Al terminar vas a poder:

- Explicar por qué `let` no sirve para actualizar la UI y cómo `useState` lo resuelve
- Leer y escribir clases de Tailwind para espaciado, colores, tipografía y layout
- Usar clases condicionales de Tailwind (`className={...}`) para cambiar estilos según el estado
- Aplicar el sistema responsive de Tailwind (`sm:`, `md:`, `lg:`)

---

## Paso 0 — Setup

El `App.jsx` de esta carpeta ya tiene dos ejemplos de contador (`ContadorRoto` y `ContadorBueno`).  
Ábrelo, léelo y corre el proyecto para ver ambos en acción:

```bash
npm run dev
```

Entiende la diferencia entre los dos antes de continuar. Esa diferencia es el tema central de toda la clase.

---

## Parte 1 — Repaso rápido con el Contador (10 min)

El instructor va a recorrer el `App.jsx` mostrando:

1. **`ContadorRoto`** — usa `let`, la pantalla nunca cambia. ¿Por qué?
2. **`ContadorBueno`** — usa `useState`, funciona. ¿Qué cambió?

```
let contador = 0          →  React no sabe que cambió → pantalla congelada ❌
useState(0)               →  React detecta el cambio → re-render ✅
```

Observa la consola del navegador mientras clickeás el botón del contador roto: el valor sí cambia en memoria, pero la pantalla nunca se actualiza. Eso te muestra exactamente el problema que resuelve `useState`.

---

## Parte 2 — Tailwind en acción: utilidades esenciales (20 min)

El `App.jsx` de esta carpeta ya tiene ambos contadores funcionando con Tailwind. El instructor va a recorrer las clases usadas y explicar el sistema de utilidades.

### 2.1 — Espaciado: `p`, `m`, `gap`

```jsx
// p = padding (todos los lados)
// px = padding horizontal   py = padding vertical
// m = margin
// gap = espacio entre elementos en flex/grid

<div className="p-6 px-4 py-8 m-4 gap-3">
```

> **Regla:** los números siguen la escala `x * 4px`. Entonces `p-6 = 24px`, `p-4 = 16px`.

---

### 2.2 — Colores y opacidad

Tailwind trae una paleta completa. El formato es `{propiedad}-{color}-{intensidad}`:

```jsx
// Fondo
<div className="bg-blue-500">        // azul medio
<div className="bg-red-50">          // rojo muy claro (casi blanco)
<div className="bg-gray-900">        // casi negro

// Texto
<p className="text-gray-500">        // gris suave
<p className="text-indigo-700">      // índigo oscuro
```

> El App.jsx ya usa esto: `bg-red-50`, `text-blue-500`, `text-purple-600`, etc.

---

### 2.3 — Clases condicionales (el patrón más importante)

Cuando el estilo depende del estado, usás template literals de JS dentro de `className`:

```jsx
// Opción A: ternario inline
<div className={`${contador > 0 ? 'text-blue-500' : 'text-gray-400'} text-6xl font-bold`}>

// Opción B: calcular la clase antes del return (más limpio)
const colorNumero = contador > 0 ? 'text-blue-500' : 'text-gray-400';
<div className={`${colorNumero} text-6xl font-bold`}>
```

> El contador funcional en `App.jsx` usa exactamente la Opción B. Buscá `colorNumero` en el código.

---

### 2.4 — Hover, focus y active

Tailwind tiene prefijos para estados interactivos:

```jsx
<button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200">
//                             ^                  ^                  ^
//                       al pasar mouse      al hacer clic     transición suave
```

> Esto ya está en los botones del `App.jsx`. Mirá las clases de los `<button>`.

---

export default function App() {
return (

<div>

## Parte 3 — Tailwind Responsive: los prefijos `sm:`, `md:`, `lg:` (10 min)

Tailwind usa un sistema **mobile-first**: las clases sin prefijo aplican en todos los tamaños. Los prefijos solo activan la clase a partir de ese breakpoint.

| Prefijo         | Breakpoint    | Uso típico       |
| --------------- | ------------- | ---------------- |
| _(sin prefijo)_ | 0px → siempre | Mobile           |
| `sm:`           | 640px+        | Tablets pequeñas |
| `md:`           | 768px+        | Tablets          |
| `lg:`           | 1024px+       | Desktop          |
| `xl:`           | 1280px+       | Desktop ancho    |

### Ejemplos que ya usamos

```jsx
// Ocultar algo en mobile, mostrar en desktop:
<div className="hidden md:flex">
//              ^       ^
//          oculto    visible desde 768px

// Mostrar en mobile, ocultar en desktop:
<button className="md:hidden">
//                  ^
//              se oculta desde 768px

// Layout en columna mobile, fila en desktop:
<div className="flex flex-col md:flex-row">
//                    ^            ^
//                columna        fila desde 768px
```

### Ejercicio mental

¿Qué pasa con esta clase en mobile vs desktop?

```jsx
<div className="text-sm md:text-xl font-normal md:font-bold">
```

> **Mobile (< 768px):** texto pequeño (`text-sm`) y peso normal  
> **Desktop (768px+):** texto grande (`text-xl`) y negrita (`font-bold`)

### Para reducir el navegador y simular mobile:

- Chrome DevTools → ícono de dispositivo (o `Ctrl+Shift+M`)
- Arrastrá el borde de la ventana para ver los breakpoints en acción

---

## Resultado esperado

Al terminar esta práctica, el `App.jsx` que tenés en pantalla muestra:

- `ContadorRoto` — evidencia visualmente por qué `let` no funciona
- `ContadorFuncional` — demuestra cómo `useState` lo soluciona
- Entendés cómo leer las clases de Tailwind que los rodean: espaciado, colores, clases condicionales, hover y responsive

Esto es la base que necesitás para escribir cualquier componente del **Proyecto Semanal** (el blog Appwise).

---

## Desafío extra (si terminás antes)

Agregá un nuevo componente `TarjetaPerfil` al `App.jsx` que muestre una tarjeta de usuario con:

- Avatar (podés usar una imagen de `https://i.pravatar.cc/80`)
- Nombre de usuario
- Un botón "Seguir" / "Siguiendo" que alterne con `useState`
- Cuando está en modo "Siguiendo": fondo `bg-blue-600`, texto blanco
- Cuando está en modo "Seguir": borde `border border-blue-600`, texto `text-blue-600`

> **Pista:** Un solo `useState(false)` es suficiente. Usá clases condicionales con template literals.
