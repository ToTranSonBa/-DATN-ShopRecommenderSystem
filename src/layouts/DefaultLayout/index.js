import Header from '../../components/Header/index';
import Footer from '../../components/Footer/Footer';

function DefaultLayout({ children }) {
    return (
        <div className="relative">
            <Header />
            <div>{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
