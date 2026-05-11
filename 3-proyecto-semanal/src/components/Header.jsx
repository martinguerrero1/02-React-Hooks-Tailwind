import logo from '../assets/negro.png'

function Header(){
    return(
        <div className="flex justify-between bg-none w-full p-3">
            <div className="flex items-center gap-3">
                <img src={logo} alt="" className='rounded-full w-8 h-8'/>
                <h2 className='text-3xl font-bold font-mono'>Appwise</h2>
            </div>

            <div className='flex items-center gap-8 text-2xl'>
                <ul className='flex gap-8'>
                    <li><a href="#">Inicio</a></li>
                    <li><a href="#">Tendencia</a></li>
                    <li><a href="#">Más populares</a></li>
                    <li><a href="#">Nosotros</a></li>
                </ul>
                <button className='text-white bg-blue-800 px-5 py-2 rounded-full font-semibold font-'>Entrar 👋</button>
            </div>
        </div>
    )
}

export default Header;