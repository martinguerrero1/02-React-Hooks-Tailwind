import { useState } from "react";
import { mockArticles } from "../data/mockData";

function Articles(){
    const [articles] = useState(mockArticles);

    return(
        <section className="flex flex-col gap-5 mt-3">
            <h2 className="text-gray-600 font-semibold text-2xl">Articulos recientes</h2>
            <div className="flex flex-col gap-15">
                {articles.map((article) => (
                    <article key={article.id} className="flex gap-4">
                        <img src={article.imagen} alt="" className="w-1/3 rounded-xl"/>
                        <div className="flex flex-col gap-2 justify-center">
                            <h3 className="text-[2.5vw] font-bold" >{article.titulo}</h3>
                            <p className="text-gray-500 text-[1vw]">Escrito por <span className="text-blue-800">{article.autor}</span> en <span className="text-blue-800">{article.categoria}</span> <span>1 year ago</span></p>
                            <p className="text-[1.2vw]">{article.descripcion}</p>
                            <a href="#" className="text-blue-800 underline text-[1.2vw]">Leer más...</a>
                        </div>
                    </article>
                ))}

                {/* <article className="flex gap-4">
                    <img src="https://picsum.photos/id/1015/800/400" alt="" className="w-1/3 rounded-xl"/>
                    <div className="flex flex-col gap-2 justify-center">
                        <h3 className="text-[2.5vw] font-bold" >Construyendo busquedas con Elasticsearch</h3>
                        <p className="text-gray-500 text-[1vw]">Escrito por <span className="text-blue-800">juanperez</span> en <span className="text-blue-800">Motores de Busqueda</span> <span>1 year ago</span></p>
                        <p className="text-[1.2vw]">Añade búsqueda de texto completo a tu aplicación usando Elasticsearch y aprende sobre los índices invertidos.</p>
                        <a href="#" className="text-blue-800 underline text-[1.2vw]">Leer más...</a>
                    </div>
                </article>
                <article className="flex gap-4">
                    <img src="https://picsum.photos/id/1015/800/400" alt="" className="w-1/3 rounded-xl"/>
                    <div className="flex flex-col gap-2 justify-center">
                        <h3 className="text-[2.5vw] font-bold" >Construyendo busquedas con Elasticsearch</h3>
                        <p className="text-gray-500 text-[1vw]">Escrito por <span className="text-blue-800">juanperez</span> en <span className="text-blue-800">Motores de Busqueda</span> <span>1 year ago</span></p>
                        <p className="text-[1.2vw]">Añade búsqueda de texto completo a tu aplicación usando Elasticsearch y aprende sobre los índices invertidos.</p>
                        <a href="#" className="text-blue-800 underline text-[1.2vw]">Leer más...</a>
                    </div>
                </article>
                <article className="flex gap-4">
                    <img src="https://picsum.photos/id/1015/800/400" alt="" className="w-1/3 rounded-xl"/>
                    <div className="flex flex-col gap-2 justify-center">
                        <h3 className="text-[2.5vw] font-bold" >Construyendo busquedas con Elasticsearch</h3>
                        <p className="text-gray-500 text-[1vw]">Escrito por <span className="text-blue-800">juanperez</span> en <span className="text-blue-800">Motores de Busqueda</span> <span>1 year ago</span></p>
                        <p className="text-[1.2vw]">Añade búsqueda de texto completo a tu aplicación usando Elasticsearch y aprende sobre los índices invertidos.</p>
                        <a href="#" className="text-blue-800 underline text-[1.2vw]">Leer más...</a>
                    </div>
                </article> */}
            </div>
        </section>
    )
}

export default Articles