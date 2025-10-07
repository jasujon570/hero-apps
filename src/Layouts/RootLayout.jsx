import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
            
        </div>
    );
};

export default RootLayout;