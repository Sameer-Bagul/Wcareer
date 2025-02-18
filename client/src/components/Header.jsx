import { useContext } from "react"
import { assets } from "../assets/assets"
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom"

const Header = () => {

    const navigate = useNavigate()
    const { userData, isLoggedin } = useContext(AppContext);

    return (
        <div className="flex flex-col items-center justify-center mt-20 px-4 text-center text-gray-800">
            <img src={assets.header_img} alt="" className="w-36 h-36 rounded-full mb-6" />
            <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
                Hey {userData ? userData.name : "Developer"}!
                <img
                    src={assets.hand_wave}
                    alt=""
                    className="w-8 aspect-square"
                />
            </h1>

            <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
                Welcome to our app
            </h2>

            <p className='mb-8 max-w-md'>
                Let&apos;s start with a Quick Product Tour and we will have you up and running in no time.
            </p>

            <div className="flex flex-col items-center gap-4 mb-8">

                {isLoggedin &&
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="cursor-pointer border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all">
                        Dashboard
                    </button>

                }
                <button className="cursor-pointer border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all">
                    Get Started
                </button>


            </div>

        </div>
    )
}

export default Header