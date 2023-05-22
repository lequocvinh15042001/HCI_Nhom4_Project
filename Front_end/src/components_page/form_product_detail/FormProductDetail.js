import { toast } from 'react-toastify';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { pathNames } from '~/routes';
import { cartServices } from '~/services';
import { cartActions, userSelector } from '~/redux';
import InputQuantity from '~/components/input_quantity/InputQuantity';

import ProductOptions from '../product_options/ProductOptions';
import { cx, context, form } from './constant';

function FormProductDetail({
    groupClass,
    titleClass,
    options,
    productQuantity,
    producId,
}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector(userSelector.getUserId);
    const [maxQuantity, setMaxQuantity] = useState(0);
    const { control, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            quantity: 1,
        },
    });

    useEffect(() => {
        if (options.length) {
            setValue('option', { ...options[0], index: 0 });
        }
    }, [options, options.length, setValue]);

    useEffect(() => {
        if (!options.length) {
            setMaxQuantity(productQuantity);
        } else {
            setMaxQuantity(options[0].stock);
        }
    }, [productQuantity, options]);

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (name === 'option' && value?.option) {
                setMaxQuantity(value.option.stock);
            }

            if (name === 'option' && type === 'change') {
                setValue('quantity', 1);
            }
        });

        return () => {
            setValue('option', undefined);
            setValue('quantity', 1);
            subscription.unsubscribe();
        };
    }, [watch, setValue, options]);

    const onSubmit = async (data) => {
        if (!userId) {
            navigate(pathNames.login);
        }
        const { quantity, option } = data;

        const result = await cartServices.addCart({
            producId,
            productOptionId: option?.id,
            value: option?.value,
            quantity,
        });

        if (result.isSuccess === 'true') {
            toast.success('Đã thêm vào giỏ hàng');
            dispatch(cartActions.increaseQuantity());
        } else {
            toast.error('Không thể thêm vào giỏ hàng');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Options */}
            <div className={cx(groupClass)}>
                <Controller
                    control={control}
                    name={'option'}
                    render={({ field: { onChange, value } }) => (
                        <ProductOptions
                            options={options}
                            onChange={(value) => onChange(value)}
                            value={value}
                        />
                    )}
                />
            </div>

            {/* Input quantity */}
            <div className={cx(groupClass)}>
                {!!options.length || (
                    <Fragment>
                        <span
                            className={cx(titleClass, {
                                'emphasized-text': !maxQuantity,
                            })}
                        >
                            {maxQuantity ? context.quantity : context.empty}
                        </span>
                        {!!maxQuantity && (
                            <span>{`${maxQuantity} sản phẩm`}</span>
                        )}
                    </Fragment>
                )}

                <Controller
                    control={control}
                    name={form.quantity}
                    render={({ field: { onChange, value } }) => (
                        <InputQuantity
                            startNumber={value}
                            onChange={(value) => onChange(value)}
                            max={maxQuantity}
                        />
                    )}
                />
            </div>

            {/* Action */}
            <div className={cx(groupClass)}>
                <button
                    className={cx('action-btn', {
                        'action-btn--disable': !maxQuantity,
                    })}
                    type={'submit'}
                >
                    {context.addToCart}
                </button>
            </div>
        </form>
    );
}

export default FormProductDetail;
