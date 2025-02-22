import Header from "../components/home-common/Header"
import Navabr from "../components/home-common/Navabr"

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/bg_img.png')] bg-cover bg-center">
      <Navabr />
      <Header />
    </div>
  )
}

export default Home