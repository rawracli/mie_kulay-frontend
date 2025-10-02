import React, {useEffect} from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Aos from "aos";
import "aos/dist/aos.css"

function MainLayout() {
    useEffect(() => {
    Aos.init({
      once: true,
    });
  }, []);
  return (
    <>
      <Navbar />
      <div className="h-[62px] sm:h-20 md:h-[104px]"></div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
