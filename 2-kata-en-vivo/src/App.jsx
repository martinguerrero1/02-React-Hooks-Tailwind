import "./App.css";
import { usePosts } from "./services/usePosts";

function App() {
  const { posts, cargando, error } = usePosts();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Posts recientes</h2>
      {cargando && (
        <div className="w-screen h-screen flex items-center justify-center">
          CARGANDO...
        </div>
      )}

      {error && (
        <div className="w-screen h-screen flex items-center justify-center">
          {error}
        </div>
      )}

      {!cargando && !error && posts.length > 0 && (
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
}

export default App;
