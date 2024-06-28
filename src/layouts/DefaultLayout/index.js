import Header from '../../components/Header/index';
import Footer from '../../components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import { SearchProvider } from '../../components/searchContext';

function DefaultLayout({ children }) {
    return (
        <SearchProvider>
            <div className="relative">
                <Header />
                <div>{children}</div>
                <ToastContainer />

                <Footer />
            </div>
        </SearchProvider>
    );
}

export default DefaultLayout;
