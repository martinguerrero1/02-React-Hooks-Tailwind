# Clase 02 — Estado con `useState` y Estilos con Tailwind CSS

> **Nivel:** Junior / Principiante  
> **Prerrequisito:** Haber completado la Clase 01 (Componentes y Props)  
> **Duración estimada de lectura:** 35-45 minutos  
> **🔗 Link al Cheatsheet / Deploy:** _[PENDIENTE — el instructor lo compartirá al inicio de la clase]_

---

## Índice

1. [El problema: por qué las variables normales no funcionan en React](#1-el-problema-por-qué-las-variables-normales-no-funcionan)
2. [useState: el Hook que te da memoria](#2-usestate-el-hook-que-te-da-memoria)
3. [La anatomía de useState](#3-la-anatomía-de-usestate)
4. [La Regla de Oro: NUNCA mutes el estado directamente](#4-la-regla-de-oro-nunca-mutes-el-estado-directamente)
5. [Tailwind CSS: el sistema de clases utilitarias](#5-tailwind-css-el-sistema-de-clases-utilitarias)
6. [Glosario de clases Tailwind esenciales](#6-glosario-de-clases-tailwind-esenciales)
7. [Resumen y Cheatsheet rápido](#7-resumen-y-cheatsheet-rápido)

---

## 1. El problema: por qué las variables normales no funcionan

Imagina que quieres hacer un contador. Tu primer instinto sería usar una variable normal:

```jsx
// ❌ ESTO NO FUNCIONA — y es muy importante entender por qué
function Contador() {
  let contador = 0; // Variable JavaScript normal

  function incrementar() {
    contador = contador + 1;
    console.log("Valor actual:", contador); // El valor cambia en consola...
    // ...pero la pantalla NO se actualiza. ¿Por qué?
  }

  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={incrementar}>+1</button>
    </div>
  );
}
```

Si pruebas este código y haces clic en el botón, verás que la pantalla **nunca se actualiza**. El `contador` cambia en memoria (puedes verlo en el `console.log`), pero React no sabe que cambió y por lo tanto **no vuelve a renderizar el componente**.

### ¿Por qué pasa esto?

Tienes que entender cómo funciona el ciclo de vida de un componente:

```
1. React llama a la función Contador()
2. Se ejecuta todo el código: let contador = 0
3. React recibe el JSX del return y lo pinta en pantalla
4. El usuario hace clic → se llama a incrementar()
5. contador cambia en la variable local, pero...
   ...React no se enteró de nada. Nadie le avisó.
6. La pantalla sigue mostrando el valor viejo.
```

La clave está en el paso 5: **React solo vuelve a renderizar un componente cuando algo que él conoce cambia**. Una variable `let` local no es algo que React monitoree.

Para que React "escuche" un cambio y actualice la pantalla, necesitas **estado**.

---

## 2. useState: el Hook que te da memoria

`useState` es una función de React (llamada **Hook**) que hace dos cosas:

1. **Guarda un valor** de manera que React lo recuerde entre renders.
2. **Le avisa a React** cuando ese valor cambia, para que vuelva a renderizar el componente.

```jsx
// ✅ ESTO SÍ FUNCIONA
import { useState } from "react";

function Contador() {
  // useState devuelve un array con dos elementos:
  // [valorActual, funcionParaCambiarlo]
  const [contador, setContador] = useState(0);

  function incrementar() {
    setContador(contador + 1); // Esto SÍ le avisa a React
    // React recibe el aviso → ejecuta Contador() de nuevo → pinta el nuevo valor
  }

  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={incrementar}>+1</button>
    </div>
  );
}
```

Ahora, cuando haces clic:

1. Se llama a `setContador(contador + 1)`.
2. React guarda el nuevo valor (`1`).
3. React vuelve a llamar a `Contador()` (re-render).
4. `contador` ahora vale `1`.
5. La pantalla se actualiza y muestra `1`. ✅

---

## 3. La anatomía de useState

```jsx
const [valor, setValor] = useState(valorInicial);
//      ^         ^                    ^
//      |         |                    |
//      |         |                    └── El valor con el que empieza
//      |         |                        (número, string, boolean, objeto, array...)
//      |         |
//      |         └── La función para ACTUALIZAR el estado
//      |              Por convención: "set" + nombre del estado en camelCase
//      |              Ej: setContador, setNombre, setIsVisible
//      |
//      └── La variable que tiene el valor ACTUAL del estado
//           (solo lectura — no la modifiques directamente)
```

### Destructuring del array

`useState` devuelve siempre un array de dos posiciones. Usamos **destructuring** para asignar nombres descriptivos:

```jsx
// Lo que hace useState internamente:
const estadoArray = useState(0);
const valor = estadoArray[0]; // El valor actual
const setValor = estadoArray[1]; // La función para cambiarlo

// La forma corta con destructuring (siempre usa esta):
const [valor, setValor] = useState(0);
```

### Distintos tipos de estado inicial

```jsx
// Estado booleano (para mostrar/ocultar, activar/desactivar)
const [estaAbierto, setEstaAbierto] = useState(false);

// Estado string (para texto, nombres, etc.)
const [nombre, setNombre] = useState("");

// Estado numérico
const [puntuacion, setPuntuacion] = useState(0);

// Estado de objeto
const [usuario, setUsuario] = useState({ nombre: "", email: "" });

// Estado de array (para listas)
const [tareas, setTareas] = useState([]);
```

### El ciclo completo de una actualización de estado

```
Usuario hace clic
      ↓
Se llama a setContador(nuevoValor)
      ↓
React guarda el nuevo valor internamente
      ↓
React programa un re-render del componente
      ↓
React vuelve a ejecutar la función del componente
      ↓
El JSX se recalcula con el nuevo valor
      ↓
React hace Diffing (compara con el DOM anterior)
      ↓
React aplica solo los cambios mínimos al DOM real
      ↓
El usuario ve la pantalla actualizada ✅
```

---

## 4. La Regla de Oro: NUNCA mutes el estado directamente

Esta es la regla más importante del estado en React. Hay que grabársela a fuego:

> **Nunca modifiques el valor del estado directamente. Siempre usa la función setter.**

```jsx
const [contador, setContador] = useState(0);

// ❌ MUTACIÓN DIRECTA — NUNCA HAGAS ESTO
contador = contador + 1; // Error: no es const
contador++; // Error: no es const

// ❌ MUTACIÓN DIRECTA CON OBJETOS — TAMBIÉN ESTÁ MAL
const [usuario, setUsuario] = useState({ nombre: "Ana", edad: 25 });
usuario.nombre = "Carlos"; // MAL: mutaste el objeto directamente
// React no se va a enterar del cambio

// ✅ CORRECTO — usa siempre la función setter
setContador(contador + 1);

// ✅ CORRECTO CON OBJETOS — crea un nuevo objeto con el spread operator
setUsuario({ ...usuario, nombre: "Carlos" });
// El spread (...usuario) copia todas las propiedades del objeto original
// y luego sobreescribes solo la que quieres cambiar.
```

### ¿Por qué es tan importante esta regla?

React usa **igualdad referencial** para detectar si algo cambió. Si mutas el objeto directamente, la referencia en memoria es la misma, y React no detecta ningún cambio. El spread operator crea un **nuevo objeto** en memoria, diferente referencia, y React sí lo detecta.

```jsx
// Sin spread (mutación — React no detecta cambio):
const obj = { nombre: "Ana" };
obj.nombre = "Carlos"; // mismo objeto en memoria
console.log(obj === obj); // true — para React, no cambió nada

// Con spread (nuevo objeto — React sí detecta cambio):
const obj = { nombre: "Ana" };
const nuevoObj = { ...obj, nombre: "Carlos" }; // nuevo objeto en memoria
console.log(obj === nuevoObj); // false — React detecta el cambio ✅
```

---

## 5. Tailwind CSS: el sistema de clases utilitarias

### ¿Qué es el CSS tradicional?

En CSS tradicional, creas clases personalizadas en un archivo `.css` y las aplicas a tus elementos:

```css
/* styles.css */
.boton-primario {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
}

.boton-primario:hover {
  background-color: #2563eb;
}
```

```jsx
// En tu JSX:
<button className="boton-primario">Click me</button>
```

Funciona, pero tiene problemas:

- Tienes que inventar nombres para cada clase.
- Saltar entre el archivo CSS y el JSX constantemente.
- Las clases se acumulan y el archivo CSS crece sin control.
- Es difícil saber qué clases se usan y cuáles están obsoletas.

---

### ¿Qué hace Tailwind diferente?

**Tailwind CSS** es un framework de CSS que usa **clases utilitarias**: clases muy pequeñas, cada una con un único propósito específico.

En lugar de crear una clase `.boton-primario`, combinas clases pequeñas directamente en el JSX:

```jsx
// Con Tailwind — no hay archivo CSS extra
<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
  Click me
</button>
```

Cada clase hace exactamente una cosa:

- `bg-blue-500` → `background-color: #3b82f6`
- `hover:bg-blue-600` → al hacer hover, `background-color: #2563eb`
- `text-white` → `color: white`
- `px-4` → `padding-left: 1rem; padding-right: 1rem`
- `py-2` → `padding-top: 0.5rem; padding-bottom: 0.5rem`
- `rounded` → `border-radius: 0.25rem`

### Ventajas de Tailwind vs CSS tradicional

| Aspecto                    | CSS Tradicional          | Tailwind CSS                              |
| -------------------------- | ------------------------ | ----------------------------------------- |
| Inventar nombres de clases | Sí, siempre              | No, usas las clases que ya existen        |
| Archivos CSS               | Crecen sin control       | No necesitas (casi)                       |
| Consistencia de diseño     | Depende de la disciplina | Automática (escala de colores, espaciado) |
| Hover, focus, responsive   | Reglas extra en CSS      | Prefijos: `hover:`, `focus:`, `md:`       |
| Purga de CSS no usado      | Manual                   | Automática en producción                  |
| Velocidad de prototipado   | Lenta                    | Muy rápida                                |

---

### Cómo instalar Tailwind en un proyecto Vite+React

```bash
npm install tailwindcss @tailwindcss/vite
```

Luego en `vite.config.js`:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Y en tu `src/index.css`, reemplaza todo el contenido con:

```css
@import "tailwindcss";
```

---

## 6. Glosario de clases Tailwind esenciales

### Colores de fondo (`bg-*`)

```jsx
<div className="bg-white">      // background-color: white
<div className="bg-gray-100">   // gris muy claro
<div className="bg-blue-500">   // azul medio
<div className="bg-blue-600">   // azul más oscuro (para hover)
<div className="bg-red-500">    // rojo
<div className="bg-green-500">  // verde
<div className="bg-transparent"> // sin fondo
```

La escala de colores va del 50 (muy claro) al 950 (muy oscuro). Los más usados son el 100, 200, 500, 600, 700.

### Colores de texto (`text-*`)

```jsx
<p className="text-white">      // color: white
<p className="text-gray-600">   // gris para texto secundario
<p className="text-gray-900">   // casi negro para texto principal
<p className="text-blue-500">   // azul para links o destacados
<p className="text-red-500">    // rojo para errores
```

### Tamaño de fuente (`text-*`)

```jsx
<p className="text-xs">    // 12px
<p className="text-sm">    // 14px
<p className="text-base">  // 16px (el default)
<p className="text-lg">    // 18px
<p className="text-xl">    // 20px
<p className="text-2xl">   // 24px
<p className="text-3xl">   // 30px
<h1 className="text-4xl">  // 36px
```

### Peso de fuente (`font-*`)

```jsx
<p className="font-normal">   // font-weight: 400
<p className="font-medium">   // font-weight: 500
<p className="font-semibold"> // font-weight: 600
<p className="font-bold">     // font-weight: 700
```

### Márgenes (`m-*`, `mt-*`, `mb-*`, `ml-*`, `mr-*`, `mx-*`, `my-*`)

```jsx
// m  = margin (todos los lados)
// mt = margin-top
// mb = margin-bottom
// ml = margin-left
// mr = margin-right
// mx = margin-left + margin-right (horizontal)
// my = margin-top + margin-bottom (vertical)

<div className="m-4">    // margin: 1rem (4 × 0.25rem)
<div className="mt-8">   // margin-top: 2rem
<div className="mb-2">   // margin-bottom: 0.5rem
<div className="mx-auto"> // margin-left: auto; margin-right: auto → centra el elemento
<div className="my-6">   // margin vertical: 1.5rem
```

La escala de espaciado: 1=0.25rem, 2=0.5rem, 4=1rem, 6=1.5rem, 8=2rem, 12=3rem, 16=4rem.

### Paddings (`p-*`, `pt-*`, `pb-*`, etc.)

```jsx
// Misma lógica que los márgenes, pero para padding
<div className="p-4">    // padding: 1rem
<div className="px-6">   // padding horizontal: 1.5rem
<div className="py-2">   // padding vertical: 0.5rem
<button className="px-4 py-2">   // el padding estándar para botones
```

### Flexbox

```jsx
<div className="flex">               // display: flex
<div className="flex items-center">  // align-items: center
<div className="flex justify-center"> // justify-content: center
<div className="flex justify-between"> // justify-content: space-between
<div className="flex flex-col">       // flex-direction: column
<div className="flex gap-4">         // gap: 1rem (espacio entre hijos)
<div className="flex flex-wrap">     // flex-wrap: wrap
```

### Dimensiones

```jsx
<div className="w-full">   // width: 100%
<div className="w-1/2">    // width: 50%
<div className="w-64">     // width: 16rem (256px)
<div className="h-screen"> // height: 100vh
<div className="h-full">   // height: 100%
<div className="min-h-screen"> // min-height: 100vh
```

### Bordes y redondeados

```jsx
<div className="border">          // border: 1px solid
<div className="border-gray-200"> // color del borde
<div className="rounded">         // border-radius: 0.25rem
<div className="rounded-md">      // border-radius: 0.375rem
<div className="rounded-lg">      // border-radius: 0.5rem
<div className="rounded-xl">      // border-radius: 0.75rem
<div className="rounded-full">    // border-radius: 9999px → círculo perfecto
```

### Sombras

```jsx
<div className="shadow-sm">  // sombra pequeña
<div className="shadow">     // sombra normal
<div className="shadow-md">  // sombra media
<div className="shadow-lg">  // sombra grande
<div className="shadow-xl">  // sombra extra grande
```

### Estados interactivos con prefijos

```jsx
// hover: → se aplica al hacer hover con el mouse
<button className="bg-blue-500 hover:bg-blue-600">  // oscurece al hover

// focus: → se aplica cuando el elemento tiene el foco
<input className="border focus:border-blue-500 focus:outline-none">

// active: → se aplica mientras se hace click
<button className="bg-blue-500 active:bg-blue-700">

// disabled: → cuando el elemento está deshabilitado
<button className="bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
```

### Responsive design con prefijos

```jsx
// sm: → desde 640px
// md: → desde 768px
// lg: → desde 1024px
// xl: → desde 1280px

// Sin prefijo = aplica en mobile (mobile-first)
<div className="flex-col md:flex-row">
// En mobile: flex-direction: column
// En tablet (768px+): flex-direction: row
```

---

## 7. Resumen y Cheatsheet rápido

```
EL PROBLEMA
└── let contador = 0 → React no monitorea variables normales
    → la pantalla nunca se actualiza

useState
├── import { useState } from 'react'
├── const [valor, setValor] = useState(valorInicial)
├── Para leer:   usa "valor" directamente en JSX
├── Para cambiar: llama a setValor(nuevoValor)
└── React detecta el cambio → re-render automático

REGLA DE ORO DEL ESTADO
├── ❌ NUNCA: valor = nuevoValor  (mutación directa)
├── ✅ SIEMPRE: setValor(nuevoValor)
└── Con objetos: setObjeto({ ...objetoViejo, clave: nuevoValor })

TAILWIND — CLASES MÁS USADAS
├── Colores:     bg-blue-500, text-white, text-gray-600
├── Tipografía:  text-xl, font-bold, font-semibold
├── Espaciado:   p-4, px-6, py-2, m-4, mx-auto, gap-4
├── Flexbox:     flex, items-center, justify-between, flex-col
├── Bordes:      rounded-lg, rounded-full, border, border-gray-200
├── Sombras:     shadow-md, shadow-lg
└── Estados:     hover:bg-blue-600, focus:outline-none
```

> 🔗 **Cheatsheet completo y Demo en vivo:** _[PENDIENTE — el instructor compartirá el link aquí]_
