const Login = () => {
  return (
    <main className="flex items-center justify-center h-full">
      <section className="w-full max-w-md px-6">
        <h1 className="mb-8 text-4xl font-bold text-center">
          Iniciar sesión
        </h1>

        <form className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full px-5 py-4 text-lg bg-white rounded-xl outline-none"
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full px-5 py-4 text-lg bg-white rounded-xl outline-none"
          />

          <button
            type="submit"
            className="py-4 text-xl font-semibold text-white transition rounded-xl bg-blue-700 hover:bg-blue-800"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-lg text-center text-gray-600">
          ¿No tienes cuenta?{' '}
          <a
            href="#"
            className="font-medium text-blue-700 underline"
          >
            Regístrate
          </a>
        </p>
      </section>
    </main>
  )
}

export default Login