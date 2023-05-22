import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { userSelector } from '~/redux';
import { reviewServices } from '~/services';

import { cx, context } from './constant';

function ReviewAction({ review, onClickEdit }) {
    const navigate = useNavigate();
    const userId = useSelector(userSelector.getUserId);

    const handleDelete = async () => {
        Swal.fire({
            title: 'Bạn muốn xóa đánh giá của mình',
            confirmButtonText: 'Xác nhận',
            showCancelButton: true,
            cancelButtonText: 'Hủy',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await reviewServices.deleteReviewByUser({
                    id: review.id,
                });
                navigate(0);
            }
        });
    };
    return (
        <div className={cx('comment-actions')}>
            {userId === review.userid && (
                <>
                    <span
                        className={cx('button', 'comment-small-text')}
                        onClick={onClickEdit}
                    >
                        {context.editButton}
                    </span>
                    <span
                        className={cx('button', 'comment-small-text')}
                        onClick={handleDelete}
                    >
                        {context.deleteButton}
                    </span>
                </>
            )}
            <span className={cx('comment-small-text')}>
                {review.createdDate}
            </span>
        </div>
    );
}

export default ReviewAction;
