import classNames from 'classnames/bind';
import styles from './Categories.module.scss';

export const cx = classNames.bind(styles);

export const context = {
    title: 'Danh sách các danh mục sản phẩm',
    addButton: '+ Thêm danh mục sản phẩm',
    imageCol: 'Hình ảnh',
    nameCol: 'Tên danh mục  sản phẩm',
    stateCol: 'Trạng thái',
    actionsCol: 'Các hoạt động',
};

export const heads = [
    'Hình ảnh',
    'Tên danh mục  sản phẩm',
    'Trạng thái',
    'Các hoạt động',
];
