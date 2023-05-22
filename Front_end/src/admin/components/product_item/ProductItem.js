import Swal from 'sweetalert2';
import parse from 'html-react-parser';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen, faPen } from '@fortawesome/free-solid-svg-icons';

import { productsAsync } from '~/redux';
import { currencyVN } from '~/utils/funcs';
import { productServices } from '~/services';
import { ButtonCustomize } from '~/admin/components';

import styles from './ProductItem.module.scss';

const cx = classNames.bind(styles);

const handleSoftDelete = ({ id, state }, callback) => {
    Swal.fire({
        title: `Bạn có muốn thay đổi không?`,
        confirmButtonText: 'Có',
        showCancelButton: true,
        cancelButtonText: 'Hủy',
        width: 'auto',
    }).then(async (result) => {
        if (result.isConfirmed) {
            if (state === 'enable') {
                const result = await productServices.deleteProduct(id);
                const expectMessage = 'Delete product successfully ';
                const toastSuccess = 'Ẩn sản phẩm thành công';
                const toastError = 'Ẩn sản phẩm thất bại';

                if (result?.message === expectMessage) {
                    toast.success(toastSuccess);
                } else {
                    toast.error(toastError);
                }
            } else {
                const result = await productServices.restoreProduct(id);
                const expectMessage = 'Update State product successfully ';
                const toastSuccess = 'Khôi phục thành công';
                const toastError = 'Khôi phục thất bại';

                if (result?.message === expectMessage) {
                    toast.success(toastSuccess);
                } else {
                    toast.error(toastError);
                }
            }

            if (callback) {
                callback();
            }
        }
    });
};

function ProductItem({ product }) {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    const itemPerPage = 5;
    const firstPage = 1;
    const currentPage = searchParams.get('page') || firstPage;

    const handleClick = (product) => {
        handleSoftDelete(product, () => {
            dispatch(
                productsAsync.getAllProductByAdmin({
                    page: currentPage - 1,
                    size: itemPerPage,
                }),
            );
        });
    };

    return (
        <tr>
            <td className={cx('col-img')}>
                {product.images[0]?.url && (
                    <img
                        className={cx('img')}
                        src={product.images[0].url}
                        alt={product.name}
                    />
                )}
            </td>
            <td className={cx('td', 'td-name')}>
                <span className={cx('product-name')}>{product.name}</span>
            </td>
            <td className={cx('td')}>
                {product.price && currencyVN(product.price)}
            </td>
            <td className={cx('td', 'td-summary')}>
                <div className={cx('ql-editor', 'summary')}>
                    {parse(product.summary)}
                </div>
            </td>
            <td className={cx('td')}>
                {product.state === 'enable' && (
                    <ButtonCustomize
                        to={`/admin/product-form/${product.id}`}
                        isRead={true}
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </ButtonCustomize>
                )}
                <ButtonCustomize
                    isEdit={product.state === 'enable'}
                    isDelete={product.state !== 'enable'}
                    onClick={() => handleClick(product)}
                >
                    <FontAwesomeIcon
                        icon={product.state === 'enable' ? faLockOpen : faLock}
                    />
                </ButtonCustomize>
            </td>
        </tr>
    );
}

export default ProductItem;
