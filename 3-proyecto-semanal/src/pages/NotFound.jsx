import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <h1 className="mb-4 text-7xl font-bold text-blue-700">
        404
      </h1>

      <h2 className="mb-3 text-3xl font-semibold">
        Página no encontrada
      </h2>

      <p className="mb-8 text-gray-600">
        El enlace que intentaste abrir no existe.
      </p>

      <Link
        to="/"
        className="px-6 py-3 text-white transition bg-blue-700 rounded-xl hover:bg-blue-800"
      >
        ← Volver al inicio
      </Link>
    </main>
  )
}

export default NotFound