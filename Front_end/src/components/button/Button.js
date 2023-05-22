import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    children,
    reset,
    fullWidth,
    block,
    solid,
    text,
    disable,
    onClick,
    to,
    navTo,
    href,
    className,
    ...passProps
}) {
    let Component = 'button';
    const props = { onClick, ...passProps };

    if (to) {
        props.to = to;
        Component = Link;
    } else if (navTo) {
        props.to = navTo;
        Component = NavLink;
    } else if (href) {
        props.href = href;
        Component = 'a';
    }

    const classes = cx({
        btn: !reset,
        'full-width': fullWidth,
        block,
        solid,
        text,
        disable,
        [className]: className,
    });

    return (
        <Component className={classes} {...props}>
            {children}
        </Component>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    reset: PropTypes.bool,
    fullWidth: PropTypes.bool,
    block: PropTypes.bool,
    solid: PropTypes.bool,
    text: PropTypes.bool,
    disable: PropTypes.bool,
    onClick: PropTypes.func,
    to: PropTypes.string,
    navTo: PropTypes.string,
    href: PropTypes.string,
    className: PropTypes.string,
};

export default Button;
