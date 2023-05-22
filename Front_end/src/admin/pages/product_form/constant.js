// import
import classNames from 'classnames/bind';
import * as yup from 'yup';

// Export
export const cx = classNames.bind();
// Format react quill
export const formatsDescription = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'color',
    'align',
];
export const modulesDescription = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [
            { align: '' },
            { align: 'center' },
            { align: 'right' },
            { align: 'justify' },
        ],
        ['link', { color: [] }],
    ],
};
export const formatsSummary = ['list', 'bullet', 'indent'];
export const modulesSummary = {
    toolbar: [[{ list: 'ordered' }, { list: 'bullet' }]],
};
// Context
export const context = {
    titleAdd: 'Thêm sản phẩm',
    titleEdit: 'Chỉnh sửa sản phẩm',
    backToProductsPage: 'Quay về trang danh sách sản phẩm',
    nameLabel: 'Tên sản phẩm ',
    priceLabel: 'Giá sản phẩm ',
    saleLabel: 'Tỉ lệ giảm giá ',
    categoryLabel: 'Danh mục ',
    optionsLabel: 'Mục lụa chọn ',
    quantityLabel: 'Số lượng sản phẩm ',
    tagsLabel: 'Tags ',
    summaryLabel: 'Tóm tắt ',
    descriptionLabel: 'Mô tả ',
    imagesLabel: 'Chọn ảnh ',
    addBtn: '+ Thêm sản phẩm',
    addOptionBtn: '+ Thêm mục lụa chọn',
    deleteOptionBtn: 'Xóa mục lựa chọn',
};
export const placeholder = {
    namePlaceHolder: 'Nhập tên sản phẩm',
};
export const productValues = [
    { name: 'name', property: 'name', defaultValue: '' },
    { name: 'price', property: 'price', defaultValue: 0 },
    { name: 'sale', property: 'sale', defaultValue: 0 },
    { name: 'images', property: 'images', defaultValue: [] },
    { name: 'summary', property: 'summary', defaultValue: '' },
    { name: 'description', property: 'description', defaultValue: '' },
    { name: 'category', property: 'category_id', defaultValue: '' },
    { name: 'tags', property: 'tags', defaultValue: [] },
    { name: 'quantity', property: 'quantity', defaultValue: 0 },
];
// Yup
const errorMessages = {
    nameRequired: 'Tên sản phẩm đang bị trống',
    priceTypeError: 'Giá sản phẩm là số',
    priceRequired: 'Giá sản phẩm đang bị trống',
    priceMin: 'Giá quá thấp',
    saleTypeError: 'Giảm giá là số',
    salePositive: 'Giảm giá là số dương',
    imagesLeast: 'Phải thêm ít nhất một ảnh',
    summaryRequired: 'Tổng quan sản phẩm đang bị trống',
    descriptionRequired: 'Mô tả sản phẩm đang bị trống',
    categoryRequired: 'Chưa chọn danh mục',
    tagsRequired: 'Phải có ít nhất một tag',
    quantityTypeError: 'Số lượng sản phẩm là số',
    quantityPositive: 'Số lượng sản phẩm là số dương',
};
export const schema = yup.object({
    name: yup.string().trim().required(errorMessages.nameRequired),
    price: yup
        .number()
        .typeError(errorMessages.priceTypeError)
        .positive()
        .required(errorMessages.priceRequired)
        .min(500, errorMessages.priceMin),
    sale: yup
        .number()
        .typeError(errorMessages.saleTypeError)
        .min(0, errorMessages.salePositive),
    images: yup.array().required(errorMessages.imagesLeast),
    summary: yup.string().required(errorMessages.summaryRequired),
    description: yup.string().required(errorMessages.descriptionRequired),
    category: yup.string().required(errorMessages.categoryRequired),
    tags: yup.array().required(errorMessages.tagsRequired),
    quantity: yup
        .number()
        .typeError(errorMessages.quantityTypeError)
        .min(0, errorMessages.quantityPositive),
});
export const defaultValues = {
    name: '',
    price: 0,
    sale: 0,
    summary: '',
    description: '',
    category: '',
    quantity: 0,
};
