import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { CategoryItem } from '~/admin/components_pages';
import { categoriesAsync, categoriesSelector } from '~/redux';
import { Button, Title, Table } from '~/components';
import { categoryServices } from '~/services';

import { context, heads, cx } from './constant';

const updateStateCategory = ({ id, name, state }, callback) => {
    Swal.fire({
        title: 'Thay đổi trạng thái',
        didOpen: async () => {
            Swal.showLoading();
            const result = await categoryServices.updateCategory(id, {
                name,
                state,
            });
            const expectMessage = 'update category success ';
            const toastSucssess = 'Thay đổi trạng thái thành công';
            const toastError = 'Thay đổi trạng thái thất bại';

            if (result.message === expectMessage) {
                toast.success(toastSucssess);
            } else {
                toast.error(toastError);
            }

            if (callback) {
                callback();
            }

            Swal.close();
        },
    });
};

function Categories() {
    const dispatch = useDispatch();
    const { itemsAdmin: categories, isLoadingAdmin } = useSelector(
        categoriesSelector.getCategoriesState,
    );

    const handleState = (category) => {
        Swal.fire({
            title: 'Chọn trạng thái cho danh mục sản phẩm',
            input: 'radio',
            inputOptions: {
                enable: 'Enable',
                disable: 'Disable',
            },
            inputValue: category.state,
            inputValidator: (value) => {
                if (!value) {
                    return 'Bạn cần chọn trạng thái cho sản phẩm!';
                }
            },
            confirmButtonText: 'Xác nhận',
            showCancelButton: true,
            cancelButtonText: 'Hủy',
        }).then(async ({ isConfirmed, value }) => {
            if (isConfirmed) {
                updateStateCategory({ ...category, state: value }, () => {
                    dispatch(categoriesAsync.getAllCategoryByAdmin());
                });
            }
        });
    };

    useEffect(() => {
        dispatch(categoriesAsync.getAllCategoryByAdmin());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Title as='h1'>{context.title}</Title>
            <Button to={'/admin/category-form'}>{context.addButton}</Button>

            <Table
                classes={cx('table')}
                heads={heads}
                isLoading={isLoadingAdmin}
            >
                {!!categories.length &&
                    categories.map((category, index) => (
                        <tr key={index}>
                            <CategoryItem
                                category={category}
                                onSetState={handleState}
                            />
                        </tr>
                    ))}
            </Table>
        </>
    );
}

export default Categories;
