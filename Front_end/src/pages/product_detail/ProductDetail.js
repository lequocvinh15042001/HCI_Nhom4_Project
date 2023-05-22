import parser from 'html-react-parser';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    Comments,
    Rating,
    Images,
    RelationByCate,
    FormProductDetail,
} from '~/components_page';
import { userSelector } from '~/redux';
import { Button, Title } from '~/components';
import { currencyVN, priceSaleVN } from '~/utils/funcs';
import { orderServices, productServices, reviewServices } from '~/services';

import { cx, context } from './constant';
import './ProductDetail.scss';

function ProductDetail() {
    const userId = useSelector(userSelector.getUserId);
    const [toggleForm, setToggleForm] = useState(false);
    const [isExistReview, setIsExistReview] = useState(true);
    const [isAllowReview, setIsAllowReview] = useState(true);
    const [product, setProduct] = useState({
        name: '',
        price: 0,
        sale: 0,
        tags: [],
        summary: '',
        description: '',
        options: [],
        quantity: 0,
    });
    const [reviews, setReviews] = useState({
        totalQuantity: 0,
        totalPage: 0,
        list: [],
    });
    const { id } = useParams();

    useEffect(() => {
        const fetchApi = async (id) => {
            const result = await productServices.getProduct(id);
            setProduct(result);

            if (userId) {
                const resultAllOrder =
                    await orderServices.userGetOrdersComplete();

                const existOrder = resultAllOrder.list.some((order) => {
                    return order.items.some((item) => {
                        return item.productid === id;
                    });
                });

                setIsAllowReview(existOrder);
            }

            try {
                const resultReviews = await reviewServices.getReviewByProductId(
                    id,
                );

                const existReview = resultReviews.list.some(
                    (item) => item.userid === userId,
                );

                setIsExistReview(existReview);
                setReviews(resultReviews);
            } catch (error) {
                setIsExistReview(false);
                setReviews({
                    totalQuantity: 0,
                    totalPage: 0,
                    list: [],
                });
            }
        };

        fetchApi(id);

        window.scrollTo(0, 0);
    }, [id, userId]);

    const rating = useMemo(() => {
        const total = reviews.list.reduce(
            (accumulator, currentValue) => {
                if (currentValue.state === 'enable') {
                    accumulator.totalStar += currentValue.rate;
                    accumulator.quantity += 1;
                }
                return accumulator;
            },
            { totalStar: 0, quantity: 0 },
        );

        return total;
    }, [reviews.list]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid', 'wide')}>
                <div className={cx('section', 'section--flex')}>
                    {/* Image */}
                    <div className={cx('section-left')}>
                        {product?.images && <Images images={product.images} />}
                    </div>

                    {/* Infomation */}
                    <div className={cx('section-right')}>
                        <Title as='h1'>{product.name}</Title>

                        {/* Rating */}
                        <div className={cx('section-right__group', 'rating')}>
                            <Rating rating={rating} />
                        </div>

                        {/* Price */}
                        <div className={cx('section-right__group')}>
                            <span className={cx('product-sale')}>
                                {currencyVN(
                                    priceSaleVN(product.price, product.sale),
                                )}
                            </span>

                            <span className={cx('product-old-price')}>
                                {!!product.sale && currencyVN(product.price)}
                            </span>
                        </div>

                        {/* Tags */}
                        <div className={cx('section-right__group')}>
                            <span className={cx('section-title')}>
                                <FontAwesomeIcon
                                    className={cx('section-icon')}
                                    icon={faTag}
                                />
                                {context.tags}{' '}
                            </span>

                            <span className={cx('section-text')}>
                                {product.tags.join(', ')}
                            </span>
                        </div>

                        {/* Summary */}
                        <div className={cx('section-right__group')}>
                            <div className={cx('ql-editor', 'summary')}>
                                {parser(product?.summary)}
                            </div>
                        </div>

                        {/* Form */}
                        <FormProductDetail
                            groupClass={cx('section-right__group')}
                            titleClass={cx('section-title')}
                            options={product.options}
                            productQuantity={product.quantity}
                            producId={id}
                        />
                    </div>
                </div>

                {/* Description */}
                <div className={cx('section')}>
                    <div className={cx('section__wrapper')}>
                        <Title as='h2' line>
                            {context.description}
                        </Title>
                        <div className={cx('ql-editor', 'description')}>
                            {parser(product.description)}
                        </div>
                    </div>
                </div>

                {/* Comment */}
                <div className={cx('section')}>
                    <div className={cx('section__wrapper')}>
                        <Title as='h2' line>
                            {context.review(reviews.totalQuantity)}
                        </Title>

                        {!!userId && !isAllowReview && (
                            <Title as='h3'>{context.notifyReview}</Title>
                        )}

                        {!!userId && isAllowReview && !isExistReview && (
                            <Button onClick={() => setToggleForm(true)}>
                                {context.reviewButton}
                            </Button>
                        )}
                    </div>

                    <div className={cx('section__wrapper')}>
                        <Comments
                            reviews={reviews.list}
                            setIsReview={setToggleForm}
                            isReview={toggleForm}
                            productId={id}
                        />
                    </div>
                </div>

                {/* Relation */}
                <div className={cx('section')}>
                    <div className={cx('section__wrapper')}>
                        {product?.category_id && (
                            <RelationByCate
                                productId={id}
                                categoryId={product.category_id}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
