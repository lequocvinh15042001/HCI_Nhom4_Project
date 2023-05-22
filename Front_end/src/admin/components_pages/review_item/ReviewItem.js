import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import HTMLReactParser from 'html-react-parser';
import withReactContent from 'sweetalert2-react-content';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';

import { reviewServices } from '~/services';
import { ButtonCustomize } from '~/admin/components';

import styles from './ReviewItem.module.scss';

const reactSwal = withReactContent(Swal);
const cx = classNames.bind(styles);

function ReviewItem({ review, callback }) {
    const handleReadContent = (content) => {
        reactSwal.fire({
            title: 'Nội dung đánh giá',
            html: (
                <div className={cx('wrapper-content')}>
                    {HTMLReactParser(content)}
                </div>
            ),
        });
    };
    const handleToggeBlock = async ({ id, state }) => {
        switch (state) {
            case 'enable':
                const expectMessageBlock = 'Block comment successfully ';
                const resultBlock = await reviewServices.blockReview({ id });

                if (resultBlock?.message === expectMessageBlock) {
                    toast.success('Đã khóa đánh giá');

                    callback();
                } else {
                    toast.error('Không thể khóa đánh giá này');
                }
                break;
            case 'block':
                const expectMessageEnable = ' Comment successfully ';
                const resultEnable = await reviewServices.unblockReview({ id });

                if (resultEnable?.message === expectMessageEnable) {
                    toast.success('Đã mở khóa đánh giá');

                    callback();
                } else {
                    toast.error('Không thể mở khóa đánh giá này');
                }
                break;
            default:
                break;
        }
    };

    return (
        <tr>
            <td className={cx('td-review-id')} title={review.id}>
                {review.id}
            </td>
            <td className={cx('td-user')} title={review.reviewedBy}>
                {review.reviewedBy}
            </td>
            <td className={cx('td-product')} title={review.productname}>
                {review.productname}
            </td>
            <td>{review.lastupdateDate || review.createdDate}</td>
            <td>
                <ButtonCustomize
                    isEdit={review.state === 'enable'}
                    isDelete={review.state === 'block'}
                    onClick={() => handleToggeBlock(review)}
                >
                    <FontAwesomeIcon
                        icon={review.state === 'enable' ? faLockOpen : faLock}
                    />
                </ButtonCustomize>
                <ButtonCustomize
                    isRead={true}
                    onClick={() => handleReadContent(review.content)}
                >
                    <FontAwesomeIcon icon={faEye} />
                </ButtonCustomize>
            </td>
        </tr>
    );
}

ReviewItem.propTypes = {
    callback: PropTypes.func,
};

export default ReviewItem;
