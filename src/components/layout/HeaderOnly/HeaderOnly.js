import styles from './HeaderOnly.scss';
import classNames from 'classnames/bind';


function DefaultLayout({ children }) {
    return (
        <div className='wrapper'>
            <div className='container'>{children}</div>
        </div>
    );
}

export default DefaultLayout;
