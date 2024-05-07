import styles from './HeaderOnly.scss';
import classNames from 'classnames/bind';


function DefaultLayout({ children }) {
    return (
        <div >
            <div >{children}</div>
        </div>
    );
}

export default DefaultLayout;
