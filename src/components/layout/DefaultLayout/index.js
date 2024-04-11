import Navigation from '../components/Navigation/Navigation';

function DefaultLayout({ children }) {
    return (
        <div>
            <Navigation />
            <div>{children}</div>
        </div>
    );
}

export default DefaultLayout;