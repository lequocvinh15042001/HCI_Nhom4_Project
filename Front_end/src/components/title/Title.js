import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Title.module.scss';

const cx = classNames.bind(styles);

function Title({ children, classNames, line, center, right, as }) {
    const classes = cx('title', {
        [classNames]: classNames,
        line,
        center,
        right,
        [as]: as,
    });

    const Component = as;

    return <Component className={classes}>{children}</Component>;
}

Title.propTypes = {
    children: PropTypes.node.isRequired,
    classNames: PropTypes.string,
    line: PropTypes.bool,
    center: PropTypes.bool,
    right: PropTypes.bool,
    as: PropTypes.string,
};

export default Title;
