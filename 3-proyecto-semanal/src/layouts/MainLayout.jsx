import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="flex flex-col gap-10 lg:px-25 md:px-10">
        <Header></Header>
        <Outlet></Outlet>
    </div>
  )
}

export default MainLayout