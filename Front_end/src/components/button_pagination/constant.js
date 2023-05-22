import classNames from 'classnames/bind';
import styles from './ButtonPagination.module.scss';

export const cx = classNames.bind(styles);

export const arrayPageItem = ({ currentPage, displayPages, totalPage }) => {
    const array = [];
    const firstPage = 1;
    const numberSides = Math.floor(displayPages / 2);
    let startPage = currentPage - numberSides;
    let endPage = currentPage + numberSides;

    if (startPage < firstPage) {
        startPage = firstPage;
        endPage = displayPages;
    }

    if (endPage > totalPage) {
        endPage = totalPage;
        startPage = totalPage - displayPages + 1;
    }

    for (let page = startPage; page <= endPage; page++) {
        array.push(page);
    }

    return array;
};
