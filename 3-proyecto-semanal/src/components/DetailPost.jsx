import { useParams } from "react-router-dom";
import { mockPosts } from "../data/mockData";

export default function DetailPost() {
    const {id} = useParams();

    const post = mockPosts.find(post => Number(post._id) === Number(id));

  return (
    <article>
        <section>
            <div>
                <h1>{post.title}</h1>
                <p className="text-gray-500 text-[1vw]">
                    Escrito por <span className="text-blue-800">{post.user.username}</span> en <span className="text-blue-800">{post.category}</span> <span>1 year ago</span>
                </p>
                <p>{post.desc}</p>
            </div>
            <img src={post.img} alt={post.title} />
        </section>

        <section>
            {/* Uso dangerouslySetInnerHTML para poder meter semantica html de una */}
            <div dangerouslySetInnerHTML={{ __html: post.content }} />

            <div>
                
            </div>
        </section>
    </article>
  )
}