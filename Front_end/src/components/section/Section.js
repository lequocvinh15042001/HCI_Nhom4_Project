import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Section.module.scss';

const cx = classNames.bind(styles);

function Section({ children, classNames }) {
    return <div className={cx('section', classNames)}>{children}</div>;
}

Section.propTypes = {
    children: PropTypes.node.isRequired,
    classNames: PropTypes.string,
};

export default Section;
