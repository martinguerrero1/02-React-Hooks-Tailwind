import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";

export default function DetailPost() {
    const {slug} = useParams();
    
    const [post, setPost] = useState();
    
    useEffect(() => {
        async function fetchPost() {
            const  postsResponse = await axios.get("http://localhost:3000/posts");
            
            const postData = postsResponse.data.find(post => post.slug == slug);
            setPost(postData)
        }

        fetchPost();
    }, [])

    if (!post){
        return (<Loading/>)
    }

  return (
    <article className="flex flex-col gap-10 mb-8">
        <section className="flex gap-8">
            <div className="flex-6 flex flex-col gap-6">
                <h1 className="text-5xl font-bold">{post.title}</h1>
                <p className="text-gray-500">
                    Escrito por <span className="text-blue-800">{post.user.username}</span> en <span className="text-blue-800">{post.category}</span> <span>1 year ago</span>
                </p>
                <p className="text-gray-700">{post.desc}</p>
            </div>

            <img src={post.img} alt={post.title} className="hidden lg:block flex-4 rounded-4xl w-1/3"/>
        </section>

        <section className="flex flex-col lg:flex-row gap-8">
            <div dangerouslySetInnerHTML={{ __html: post.content }} className="flex-6 text-xl text-justify" />

            <div className="flex-4 flex flex-col text-l gap-4">
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold">Autor</h3>
                    <div className="flex gap-4 items-center">
                        <img src={post.user.img} alt="" className="rounded-full"/>
                        <p className="text-blue-800">{post.user.username}</p>
                    </div>
                    <p className="text-gray-500">Apasionado por la tecnología y el desarrollo web.</p>
                    <div className="flex gap-2">
                        <img src={`https://picsum.photos/seed/${post._id}-1/800/400`} alt="" className="flex-1 min-w-0"/>
                        <img src={`https://picsum.photos/seed/${post._id}-2/800/400`} alt="" className="flex-1 min-w-0"/>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold mb-2">Acciones</h3>
                    <div className="flex gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
</                      svg>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                        </svg>
                    </div>
                </div>

                <div className="flex flex-col">
                    <h3 className="font-bold mb-2">Categorias</h3>
                    <ul className="underline mb-4">
                        <li>Todas</li>
                        <li>Diseño Web</li>
                        <li>Desarrollo</li>
                        <li>Bases de Datos</li>
                        <li>Motores de Busquedas</li>
                        <li>Marketing</li>
                    </ul>

                    <h4 className="font-semibold mb-2">Buscar</h4>
                    <input type="search" name="searchbar" id="" placeholder="🔍 search a post..." className="bg-white rounded-full px-3 py-2 outline-none"/>
                </div>
            </div>
        </section>
    </article>
  )
}