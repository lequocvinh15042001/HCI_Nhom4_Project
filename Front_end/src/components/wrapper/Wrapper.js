import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Wrapper.module.scss';

const cx = classNames.bind(styles);

function Wrapper({ children, classnames }) {
    return <div className={cx('wrapper', classnames)}>{children}</div>;
}

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
    classnames: PropTypes.string,
};

export default Wrapper;
