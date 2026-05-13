import { useState } from "react";
import {mockPosts} from "../data/mockData"



function Posts(){
    const [posts] = useState(mockPosts);

    const postGrande = posts[0];
    // console.log(postGrande);
    const postsChicos = posts.filter(post => post._id > 1 && post._id < 5);
    // console.log(postsChicos);
    
    return(
        <section className="flex w-full gap-6">
            <article className="flex flex-5 flex-col gap-5">
                <img src={postGrande.img} alt="" className="rounded-2xl h-96 w-full"/>
                <p className="flex gap-3"><span className="font-bold">{postGrande._id.toString().padStart(2, "0")}.</span> <span className="text-blue-800">{postGrande.category}</span> <span className="text-gray-500">1 year ago</span></p>
                <h2 className="text-3xl font-extrabold">Primeros pasos con React: Guía completa</h2>
            </article>

            <div className="flex-5 flex flex-col gap-4">
                {postsChicos.map((post) => ( //el return esta implicito
                    <article key={post._id} className="flex-1 flex gap-3">
                        <img src={post.img} alt="" className="w-1/3 object-cover rounded-2xl"/>
                        <div className="flex flex-col justify-around">
                            <p className="flex gap-3"><span className="font-bold">{post._id.toString().padStart(2,"0")}.</span> <span className="text-blue-800">{post.category}</span> <span className="text-gray-500">1 year ago</span></p>
                            <h2 className="text-[1.5vw] font-extrabold">{post.title}</h2>
                        </div>
                </article>
                ))}
            </div>
        </section>
    )
}

export default Posts;