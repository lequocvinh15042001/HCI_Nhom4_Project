import * as yup from 'yup';
import { toast } from 'react-toastify';
import StarRatings from 'react-star-ratings';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { reviewServices } from '~/services';
import { Button, FormGroup, FormQuill } from '~/components';

import { cx, context } from './constant';

const schema = yup.object({
    content: yup.string().required('Bạn chưa điền nội dung'),
    rate: yup.number().min(1, 'Bạn cần đánh giá số sao'),
});

function ReviewForm({ color, review, onClickCancel }) {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            rate: review.rate,
            content: review.content === '<p><br></p>' ? '' : review.content,
        },
    });
    const navigate = useNavigate();

    const handleOnSubmit = async (data) => {
        const expectMessage = 'Update comment successfully';
        const result = await reviewServices.editReview({ id: review.id, data });
        if (result?.message === expectMessage) {
            navigate(0);
        } else {
            toast.error('Đánh giá này không chỉnh sửa được');
        }
    };

    return (
        <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div className={cx('row')}>
                <FormGroup
                    name={'rate'}
                    errors={errors}
                    classes={cx('col', 'l-12')}
                >
                    <Controller
                        control={control}
                        name={'rate'}
                        render={({ field: { onChange, value } }) => (
                            <StarRatings
                                rating={value}
                                starRatedColor={color}
                                starHoverColor={color}
                                starDimension='20px'
                                starSpacing='2px'
                                changeRating={(rating) => onChange(rating)}
                            />
                        )}
                    />
                </FormGroup>
                <FormGroup
                    name={'content'}
                    errors={errors}
                    classes={cx('col', 'l-12')}
                >
                    <FormQuill name='content' control={control} />
                </FormGroup>

                <div className={cx('col', 'l-12')}>
                    <Button
                        className={cx('button', 'button-form', 'button--edit')}
                    >
                        {context.editButton}
                    </Button>
                    <Button
                        className={cx('button', 'button-form')}
                        onClick={onClickCancel}
                    >
                        {context.cancelButton}
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default ReviewForm;
