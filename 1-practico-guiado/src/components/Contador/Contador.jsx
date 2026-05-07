import { useState } from "react";

function Contador() {
  // Forma de declarar una variable en JavaScript normal:
  // let contador = 0; // Variable JavaScript normal

  // Forma de declarar un estado en React:
  const [contador, setContador] = useState(0);
  const [label] = useState("Contador:");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const [form, setForm] = useState({
  //   email: "",
  //   password: "",
  // });

  function incrementar() {
    // contador = contador + 1; // Esto NO funciona en React, no se puede modificar el estado directamente.

    // Para modificar el estado, debemos usar la función que nos da useState:
    setContador(contador + 1);

    console.log("Valor actual:", contador); // El valor cambia en consola...
    // ...pero la pantalla NO se actualiza. ¿Por qué?
  }

  return (
    <div className="bg-gray-500 p-4">
      <p className="text-2xl text-[#ffffff]">
        {label} {contador}
      </p>
      <button onClick={incrementar} className="text-[25px]">
        +1
      </button>
    </div>
  );
}

export default Contador;
