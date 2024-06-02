import Header from '../../components/Header/index';
import Footer from '../../components/Footer/Footer';
import { SearchProvider } from '../../components/searchContext';

function DefaultLayout({ children }) {
    return (
        <SearchProvider>
            <div className="relative">
                <Header />
                <div>{children}</div>
                <Footer />
            </div>
        </SearchProvider>
    );
}

export default DefaultLayout;
