import classNames from 'classnames/bind';
import styles from './Search.module.scss';

export const cx = classNames.bind(styles);
export const pathname = 'src/pages/search/Search';
export const context = {
    title: 'Kết quả tìm kiếm',
    searchResult: (total) => `Có ${total} kết quả tìm kiếm phù hợp`,
    listEmpty: 'Không tìm thấy kết quả nào',
};
