import classNames from 'classnames/bind';
import * as yup from 'yup';

export const cx = classNames.bind();

export const context = {
    titleAdd: 'Thêm mục sản phẩm',
    titleEdit: 'Chỉnh sửa mục sản phẩm',
    backToCategoriesPage: 'Trở về trang danh mục sản phẩm',
    nameLabel: 'Tên danh mục ',
    imageLabel: 'Hình ảnh ',
    addBtn: '+ Thêm danh mục',
    editBtn: 'Chỉnh sửa danh mục',
};

export const placeholder = {
    namePlaceHolder: 'Tên danh mục',
};

export const schema = yup.object({
    name: yup.string().trim().required('Nhập tên danh mục'),
    image: yup
        .array()
        .length(1, 'Chọn một ảnh cho danh mục')
        .required('Chọn một ảnh cho danh mục'),
});

export const defaultValues = {
    name: '',
    image: [],
};
