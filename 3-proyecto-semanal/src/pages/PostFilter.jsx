import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from 'react-router-dom';

export default function PostsPage() {
  const [posts, setPost] = useState([]);
  const [parametros, setParametros] = useSearchParams();
  
  const categoryURL = parametros.get('category');
  const queryURL = parametros.get('q');
  
  
  useEffect(() => {
    async function fetchData() {

      let url = "http://localhost:3000/posts";

      const paramsURL = []
      if (categoryURL) paramsURL.push(`category=${categoryURL}`);
      // if (queryURL) paramsURL.push(`q=${queryURL}`);
      
      if(paramsURL.length) url += `?${paramsURL.join('&')}`;

      const response = await axios.get(url);
      let data = response.data;

      if (queryURL) {
        data = data.filter(post =>
          post.title.toLowerCase().includes(queryURL.toLowerCase()) ||
          post.desc.toLowerCase().includes(queryURL.toLowerCase())
        );
      }

      setPost(data);
    }
    
    fetchData();
  }, [categoryURL, queryURL])

  function handleFilter(e){
    setParametros({
      category: e.target.name === 'category' ? e.target.value : categoryURL,
      q: e.target.name === 'q' ? e.target.value : queryURL
    })
  }

  return (
    <main>
      <h1 className="text-2xl text-gray-900">Blog de Desarrollo</h1>

      <section className="flex">
        <div className="flex-7">
          {posts && posts.map(post => (
                    <article key={post.id} className="flex gap-4">
                        <img src={post.img} alt="" className="w-1/3 rounded-xl"/>
                        <div className="flex flex-col gap-2 justify-center">
                            <h3 className="text-[2.5vw] font-bold" >{post.title}</h3>
                            <p className="text-gray-500 text-[1vw]">Escrito por <span className="text-blue-800">{post.user.username}</span> en <span className="text-blue-800">{post.category}</span> <span>1 year ago</span></p>
                            <p className="text-[1.2vw]">{post.desc}</p>
                            <Link to={`/post/${post.slug}`} className="text-blue-800 underline text-[1.2vw] hover:text-blue-950 w-fit">Leer más...</Link>
                        </div>
                    </article>
          ))}
        </div>


        <aside className="flex-3">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">Buscar</h2>
            <input type="search" name="q" id="" placeholder="🔍 search a post..." className="bg-white rounded-full px-3 py-2 outline-none w-full" onChange={handleFilter}/>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Categorías</h3>

            <ul className="flex flex-col gap-3">
              <li>
                <button
                  className="underline text-left"
                  onClick={handleFilter}
                  name="category"
                >
                  Todas
                </button>
              </li>

              <li>
                <button
                  className="underline text-left"
                  onClick={handleFilter}
                  name="category"
                  value="Diseño Web"
                >
                  Diseño Web
                </button>
              </li>

              <li>
                <button
                  className="underline text-left"
                  onClick={handleFilter}
                  name="category"
                  value="Desarrollo"
                >
                  Desarrollo
                </button>
              </li>

              <li>
                <button
                  className="underline text-left"
                  onClick={handleFilter}
                  name="category"
                  value="Bases de Datos"
                >
                  Bases de Datos
                </button>
              </li>

              <li>
                <button
                  className="underline text-left"
                  onClick={handleFilter}
                  name="category"
                  value="Motores de Búsqueda"
                >
                  Motores de Búsqueda
                </button>
              </li>

              <li>
                <button
                  className="underline text-left"
                  onClick={handleFilter}
                  name="category"
                  value="Marketing"
                >
                  Marketing
                </button>
              </li>
            </ul>
          </div>
        </aside>
      </section>

    </main>
  );
}