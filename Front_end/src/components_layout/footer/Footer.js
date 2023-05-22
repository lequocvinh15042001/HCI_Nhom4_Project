import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <footer className={cx('footer')}>
            <span className={cx('footer__context')}>
                Copyright © 2023 TTNM Nhom 4
            </span>
        </footer>
    );
}

export default Footer;
