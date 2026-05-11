function Searchbar(){
    return(
        <div className="flex w-full bg-white p-3 justify-between rounded-full text-l items-center shadow-xl px-10">
            <ul className="flex justify-between w-9/12">
                <li>Todos los posts</li>
                <li>Diseño Web</li>
                <li>Desarrollo</li>
                <li>Bases de Datos</li>
                <li>Motores de Búsqueda</li>
                <li>Marketing</li>
            </ul>
            <p>|</p>
            <input type="search" placeholder="🔎︎ Buscá un posteo..." id="search" className="w-2/12 rounded-full bg-gray-100 py-2 pl-4"/>
        </div>
    )
}

export default Searchbar;