import './App.css'
import Header from './components/Header'
import Home from './pages/Home'

function App() {

  return (
    <div className="flex flex-col gap-10 lg:px-25 md:px-10">
      <Header></Header>
      <Home></Home>
    </div>
  )
}

export default App
