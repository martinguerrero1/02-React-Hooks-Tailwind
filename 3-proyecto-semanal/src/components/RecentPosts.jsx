import {Link} from 'react-router-dom'

function Articles({ posts }){
    const postRecientes = posts.reverse()

    return(
        <section className="flex flex-col gap-5 mt-3">
            <h2 className="text-gray-600 font-semibold text-2xl">Articulos recientes</h2>
            <div className="flex flex-col gap-15">
                {postRecientes.map((post) => (
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
        </section>
    )
}

export default Articles