import Header from '../../components/Header/index';
import Footer from '../../components/Footer/Footer';
import { ToastContainer } from 'react-toastify';

function DefaultLayout({ children }) {
    return (
        <div className="relative">
            <Header />
            <div>{children}</div>
            <ToastContainer />

            <Footer />
        </div>
    );
}

export default DefaultLayout;
