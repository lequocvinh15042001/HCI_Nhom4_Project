import classNames from 'classnames/bind';

import { Footer, Header } from '~/components_layout';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            {/* <BreadCrumb /> */}
            <div className={cx('wrapper')}> {children}</div>
            <Footer />
        </>
    );
}

export default DefaultLayout;
