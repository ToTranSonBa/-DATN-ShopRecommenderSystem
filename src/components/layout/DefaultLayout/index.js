import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer'
import '../DefaultLayout/DefaultLayout.scss'


function DefaultLayout({ children }) {
    return (
        <div >
            <Navigation />
            <div className='container'>{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;