// ============================================================
// CLASE 02 — Práctico Guiado
// Tema: useState + Tailwind CSS
// ============================================================
// INSTRUCCIONES PARA EL ALUMNO:
//   1. Instala Tailwind: npm install tailwindcss @tailwindcss/vite
//   2. Agrega el plugin en vite.config.js (ver README de la clase).
//   3. En src/index.css reemplaza todo por: @import "tailwindcss";
//   4. Reemplaza src/App.jsx con este archivo.
//   5. Corre el proyecto: npm run dev
// ============================================================
// Este componente demuestra:
//   - Por qué "let" no funciona para actualizar la UI
//   - Cómo useState resuelve el problema
//   - Cómo se estiliza con clases de Tailwind CSS
// ============================================================

import { useState } from "react";

// ------------------------------------------------------------
// COMPONENTE: ContadorRoto
// ------------------------------------------------------------
// ❌ Ejemplo intencional de lo que NO se debe hacer.
// Este contador usa una variable "let" normal.
// El valor cambia en memoria pero la UI nunca se actualiza.

function ContadorRoto() {
  let contadorRoto = 0;

  function incrementarRoto() {
    contadorRoto = contadorRoto + 1;
    console.log("ContadorRoto (en consola):", contadorRoto);
    // Aunque el valor cambia aquí, React no lo sabe.
    // La pantalla NUNCA se actualizará.
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-red-50 border-2 border-red-200 rounded-xl">
      <span className="text-xs font-semibold uppercase tracking-widest text-red-400">
        ❌ Ejemplo Roto (let)
      </span>
      <p className="text-gray-500 text-sm text-center">
        Abre la consola del navegador. El valor cambia allí, pero nunca en
        pantalla.
      </p>
      <div className="text-6xl font-bold text-red-400">{contadorRoto}</div>
      <button
        onClick={incrementarRoto}
        className="bg-red-400 hover:bg-red-500 active:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
      >
        +1 (no funciona)
      </button>
    </div>
  );
}

// ------------------------------------------------------------
// COMPONENTE: ContadorFuncional
// ------------------------------------------------------------
// ✅ El ejemplo correcto. Usa useState para que React
//    se entere de cada cambio y actualice la pantalla.

function ContadorFuncional() {
  // useState(0) → el contador empieza en 0
  // "contador"    → el valor actual (solo lectura)
  // "setContador" → la función para cambiar el valor
  const [contador, setContador] = useState(0);

  function incrementar() {
    setContador(contador + 1);
    // React recibe el aviso → re-render → pantalla actualizada ✅
  }

  function decrementar() {
    // Evitamos que el contador baje de 0
    if (contador > 0) {
      setContador(contador - 1);
    }
  }

  function reiniciar() {
    setContador(0);
  }

  // Calculamos el color del número según el valor
  // Esto es lógica JS normal en el componente, fuera del return
  const colorNumero =
    contador === 0
      ? "text-gray-400"
      : contador < 5
        ? "text-blue-500"
        : contador < 10
          ? "text-green-500"
          : "text-purple-600";

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
      <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
        ✅ Ejemplo Funcional (useState)
      </span>
      <p className="text-gray-500 text-sm text-center">
        Cada clic llama a{" "}
        <code className="bg-blue-100 px-1 rounded">setContador()</code> y React
        actualiza la pantalla.
      </p>

      {/* El número cambia de color según su valor */}
      <div
        className={`text-6xl font-bold transition-colors duration-300 ${colorNumero}`}
      >
        {contador}
      </div>

      {/* Botones de control */}
      <div className="flex gap-3">
        <button
          onClick={decrementar}
          disabled={contador === 0}
          className="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 font-bold w-10 h-10 rounded-lg transition-colors duration-200 cursor-pointer"
        >
          −
        </button>

        <button
          onClick={reiniciar}
          className="bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-500 text-xs font-semibold px-3 h-10 rounded-lg transition-colors duration-200 cursor-pointer"
        >
          Reset
        </button>

        <button
          onClick={incrementar}
          className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold w-10 h-10 rounded-lg transition-colors duration-200 cursor-pointer"
        >
          +
        </button>
      </div>

      {/* Mensaje condicional basado en el estado */}
      {contador >= 10 && (
        <p className="text-purple-600 font-semibold text-sm animate-bounce">
          🎉 ¡Llegaste a {contador}!
        </p>
      )}
    </div>
  );
}

// ------------------------------------------------------------
// COMPONENTE: App (componente raíz)
// ------------------------------------------------------------

function App() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-slate-800 text-white py-4 px-8 flex items-center justify-between shadow-md">
        <h1 className="text-xl font-bold tracking-tight">
          Clase 02 — useState + Tailwind
        </h1>
        <span className="text-slate-400 text-sm">React Bootcamp Intensivo</span>
      </header>

      {/* Contenido principal */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* Sección introductoria */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            El problema del Estado en React
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Compara los dos contadores de abajo. Ambos intentan incrementar un
            número, pero solo uno funciona. La diferencia está en cómo React
            "escucha" los cambios.
          </p>
        </div>

        {/* Grilla con los dos ejemplos, uno al lado del otro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <ContadorRoto />
          <ContadorFuncional />
        </div>

        {/* Caja de teoría inline */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="font-bold text-amber-800 text-lg mb-3">
            📚 ¿Por qué uno funciona y el otro no?
          </h3>
          <ul className="list-disc list-inside text-amber-700 text-sm space-y-2">
            <li>
              <strong>let contador = 0</strong>: Es una variable local. React no
              la monitorea. Cuando cambia, React no se entera y no re-renderiza
              el componente.
            </li>
            <li>
              <strong>const [contador, setContador] = useState(0)</strong>:
              React guarda este valor en su sistema interno. Cuando llamas a{" "}
              <code>setContador()</code>, React recibe la notificación y vuelve
              a ejecutar el componente con el nuevo valor.
            </li>
            <li>
              <strong>Regla de oro:</strong> Nunca modifiques el estado
              directamente. Siempre usa la función setter (
              <code>setContador</code>).
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
