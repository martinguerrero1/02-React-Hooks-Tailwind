// DEPENDENCIAS
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
// COMPONENTES
import Searchbar from "../components/Searchbar";
import Posts from "../components/Posts";
import RecentPosts from "../components/RecentPosts";
import Loading from '../components/Loading';

function Home(){
    const [posts, setPosts] = useState();

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("http://localhost:3000/posts");
            setPosts(response.data);
        }
        
        fetchData();
    }, []);

    return(
        <div className="flex flex-col gap-10">
            {/* Parte del hero */}
            <section>
                <p>
                    Inicio - <span className="text-blue-700">Blogs y Articulos</span>
                </p>

                <div className="flex justify-">
                    <div className="flex-8">
                        <h1 className="font-bold text-7xl mb-3">Tu fuente de conocimineto sobre desarrollo web y tecnología.</h1>
                        <h3 className="text-2xl">Articulos, tutoriales y guias escritos por desarrolladores.</h3>
                    </div>

                    {/* Boton de compartir */}
                    <div className="flex relative items-center justify-center flex-2">
                        {/* Creacion de texto circular con svg */}
                        <svg
                            className="absolute animate-spin-slow h-75"
                            viewBox="0 0 200 200"
                        >
                            <defs>
                            <path
                                id="circlePath"
                                d="
                                M 100, 100
                                m -70, 0
                                a 70,70 0 1,1 140,0
                                a 70,70 0 1,1 -140,0
                                "
                            />
                            </defs>

                            <text className="fill-black text-[14px] tracking-[4.5px]">
                            <textPath href="#circlePath">
                                Escribe tu historia • Comparte tu idea •
                            </textPath>
                            </text>
                        </svg>

                        {/* Botón */}
                        <Link to="/write" className="w-32 h-32 rounded-full bg-blue-600 text-white text-5xl flex items-center justify-center hover:scale-105 transition rotate-45"> ↑ </Link>
                    </div>
                </div>
            </section>

            <Searchbar />

            {posts ? <Posts posts= {posts}/> : <Loading/>}

            {posts ? <RecentPosts posts= {posts}/> : <Loading/>}
        </div>
    )
}

export default Home;