import logo from '../assets/negro.png'
import {Link} from 'react-router-dom'

function Header(){
    return(
        <div className="flex justify-between bg-none w-full p-3 text-l lg:text-s">
            <div className="flex items-center gap-3">
                <img src={logo} alt="" className='rounded-full w-8 h-8'/>
                <h2 className='text-2xl font-bold font-mono hidden lg:block'>Appwise</h2>
            </div>

            <div className='flex items-center gap-8'>
                <ul className='flex gap-8'>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/tendencias">Tendencia</Link></li>
                    <li><Link to="/populares">Más populares</Link></li>
                    <li><Link to="/nosotros">Nosotros</Link></li>
                </ul>
                <Link to="/login" className='text-white bg-blue-800 px-5 py-2 rounded-full font-semibold font-'>Entrar 👋</Link>
            </div>
        </div>
    )
}

export default Header;