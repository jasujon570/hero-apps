import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router";
import Container from "../Components/Container";
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-screen-2xl mx-auto w-full px-4 md:px-8 lg:px-12">
      <Navbar/>
      <div className="flex-1">
        <Outlet />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
      <Footer />
    </div>
  );
};

export default RootLayout;
