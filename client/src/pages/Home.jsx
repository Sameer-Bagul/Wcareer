import Header from "../components/Header"
import Navabr from "../components/Navabr"

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/bg_img.png')] bg-cover bg-center">
      <Navabr />
      <Header />
    </div>
  )
}

export default Home