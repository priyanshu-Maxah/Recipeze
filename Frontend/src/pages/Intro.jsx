import React from "react";
import {
  IonContent,
  IonPage,
} from "@ionic/react";
import { Link } from "react-router-dom";

function Intro() {
  return (
    <IonPage>
      <div className="flex items-center justify-center min-h-screen bg-img">
        <div className="w-full max-w-md p-6 flex flex-col items-center justify-center content">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-4  font-serif bg-gradient-to-r from-[#e77575] to-[#df5d5d] bg-clip-text text-transparent">
            Recipes
          </h1>
          <p className="text-gray-100 text-center text-lg md:text-xl mt-2">
            Find and share everyday cooking inspiration on Recipeze
          </p>
          <div className="flex flex-col md:flex-row md:space-x-4 w-full md:w-80 lg:w-90 gap-3 my-8">
          <Link to="/login" className="w-full py-2 bg-[#ae7159] text-white text-md  font-semibold text-center  rounded-lg hover:bg-[#af7158c6] transition duration-200">
              Login
            </Link>
            <Link  to="/register" className="w-full py-2 bg-[#79402e] text-white text-center text-md  font-semibold   rounded-lg hover:bg-[#7a3f2de4] transition duration-200">
              Register 
            </Link>
          </div>
        </div>
      </div>
    </IonPage>
  );
}

export default Intro;
