import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Slick.module.scss';

const cx = classNames.bind(styles);

function Slick({
    list,
    component,
    nameProp,
    onClick,
    large,
    medium,
    small,
    noGutters,
}) {
    const [translateX, setTranslateX] = useState(0);
    const [offsetWidth, setOffsetWidth] = useState({
        item: 0,
        listViewPort: 0,
    });
    const itemElement = useRef();
    const listElement = useRef();
    const Component = component;
    const itemCount = list.length;

    useEffect(() => {
        setOffsetWidth((prev) => {
            const item = itemElement.current?.offsetWidth;
            const list = listElement.current?.offsetWidth;
            const listViewPort = item * itemCount - list;

            console.group('Slick');
            console.log('item', item);
            console.log('list', list);
            console.dir(itemElement.current);
            console.dir(listElement.current);
            // console.log('listViewPort', listViewPort);
            console.groupEnd();

            return {
                ...prev,
                item,
                listViewPort,
            };
        });

        return () => {};
    }, [itemCount, itemElement, listElement]);

    const handlePrevious = () => {
        setTranslateX(translateX + offsetWidth.item);
    };
    const handleNext = () => {
        setTranslateX(translateX - offsetWidth.item);
    };
    const handleClick = ({ item, index }) => {
        if (onClick) {
            onClick({ item, index });
        }
    };

    return (
        <div className={cx('slick')}>
            <button
                className={cx('button', 'button--previous', {
                    'button--disable': translateX === 0,
                })}
                onClick={handlePrevious}
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <ul
                ref={listElement}
                style={{
                    transform: `translateX(${translateX}px)`,
                }}
                className={cx('list', 'row', 'row--nowrap', {
                    'no-gutters': noGutters,
                })}
            >
                {list.map((item, index) => {
                    let props = {};
                    props[nameProp] = item;
                    props.index = index;

                    return (
                        <li
                            key={index}
                            ref={itemElement}
                            className={cx('col', {
                                [`l-${large}`]: large,
                                [`m-${medium}`]: medium,
                                [`s-${small}`]: small,
                            })}
                            onClick={() => handleClick({ item, index })}
                        >
                            <Component {...props} />
                        </li>
                    );
                })}
            </ul>

            <button
                className={cx('button', 'button--next', {
                    'button--disable':
                        translateX - offsetWidth.item <
                        -offsetWidth.listViewPort,
                })}
                onClick={handleNext}
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    );
}

Slick.propTypes = {
    large: PropTypes.string,
    medium: PropTypes.string,
    small: PropTypes.string,
};

Slick.defaultProps = {
    large: '2-4',
    medium: '3',
    small: '6',
};

export default Slick;
