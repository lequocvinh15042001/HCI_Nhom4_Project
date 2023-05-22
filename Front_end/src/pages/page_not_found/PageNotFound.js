import classNames from 'classnames/bind';
import styles from './PageNotFound.module.scss';

const cx = classNames.bind(styles);

function PageNotFound() {
    return <div className={cx('content')}>Page Not Found</div>;
}

export default PageNotFound;
