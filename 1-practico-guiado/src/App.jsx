import { useState } from "react";
import "./App.css";

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
    <div className="m-2 flex flex-col items-center gap-4 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
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

function App() {
  return <ContadorFuncional />;
}

export default App;
