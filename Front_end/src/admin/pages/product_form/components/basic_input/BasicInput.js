import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
    ButtonCustomize,
    FormCreatable,
    FormSelect,
    Input,
    FormGroup,
} from '~/admin/components';
import { categoryServices, productServices } from '~/services';

import { cx, context, placeholder } from './constant';

function BasicInput({
    product,
    register,
    control,
    fields,
    append,
    remove,
    errors,
}) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await categoryServices.getCategories();

            if (result || result.length) {
                setCategories(result);
            }
        };

        fetchApi();
    }, []);

    const handleDeleteOption = async ({ index, itemId }) => {
        if (itemId) {
            const result = await productServices.deleteOptionProduct(itemId);

            if (result?.message === 'Delete Option successfully ') {
                toast.success('Xóa tùy chọn thành công');
            } else {
                toast.error('Xóa tùy chọn thất bại');
            }
        }

        remove(index);
    };

    return (
        <>
            {/* Product name */}
            <FormGroup
                classes={cx('col', 'l-12')}
                name={'name'}
                label={context.nameLabel}
                errors={errors}
                isRequired
            >
                <Input
                    type={'text'}
                    name='name'
                    register={register}
                    errors={errors}
                    placeholder={placeholder.name}
                />
            </FormGroup>

            {/* Price */}
            <FormGroup
                classes={cx('col', 'l-4')}
                name={'price'}
                label={context.priceLabel}
                errors={errors}
                isRequired
            >
                <Input
                    type={'number'}
                    name='price'
                    register={register}
                    errors={errors}
                />
            </FormGroup>

            {/* Sale */}
            <FormGroup
                classes={cx('col', 'l-4')}
                name={'sale'}
                label={context.saleLabel}
                errors={errors}
                isRequired
            >
                <Input
                    type={'number'}
                    name='sale'
                    register={register}
                    errors={errors}
                    step={0.01}
                    min={0}
                    max={1}
                />
            </FormGroup>

            {/* Category */}
            <FormGroup
                classes={cx('col', 'l-4')}
                name={'category'}
                label={context.categoryLabel}
                errors={errors}
            >
                {!!categories.length && (
                    <FormSelect
                        name='category'
                        control={control}
                        options={categories}
                        label={'name'}
                        value={'id'}
                        defaultValue={{
                            name: product?.category,
                            id: product?.category_id,
                        }}
                    />
                )}
            </FormGroup>

            {/* Options */}
            <div className={cx('col', 'l-8')}>
                {fields.map((item, index) => (
                    <div key={item.id} className={cx('row')}>
                        <div className={cx('col', 'l-6')}>
                            <div className={cx('row')}>
                                <FormGroup
                                    classes={cx('col', 'l-12')}
                                    name={`options.${index}.value`}
                                    label={`Tùy chọn ${index + 1}`}
                                >
                                    <Input
                                        type={'text'}
                                        name={`options.${index}.value`}
                                        register={register}
                                        errors={errors}
                                        placeholder={placeholder.optionValue}
                                    />
                                </FormGroup>
                                <FormGroup
                                    classes={cx('col', 'l-12')}
                                    name={`options.${index}.stock`}
                                >
                                    <Input
                                        type={'number'}
                                        name={`options.${index}.stock`}
                                        register={register}
                                        errors={errors}
                                        placeholder={placeholder.optionStock}
                                    />
                                </FormGroup>
                            </div>
                        </div>
                        <div
                            className={cx('col', 'l-6')}
                            style={{
                                alignSelf: 'flex-end',
                                marginBottom: '1.2rem',
                            }}
                        >
                            <ButtonCustomize
                                isDelete={true}
                                onClick={(event) => {
                                    event.preventDefault();
                                    handleDeleteOption({
                                        index,
                                        itemId: item.optionId,
                                    });
                                }}
                            >
                                {context.deleteOptionBtn}
                            </ButtonCustomize>
                        </div>
                    </div>
                ))}
                <ButtonCustomize
                    isEdit={true}
                    onClick={(event) => {
                        event.preventDefault();
                        append({ value: 'name', stock: 1 });
                    }}
                >
                    {context.addOptionBtn}
                </ButtonCustomize>

                {fields.length === 0 && (
                    <div className={cx('row')}>
                        <FormGroup
                            classes={cx('col', 'l-8')}
                            name={`quantity`}
                            label={context.quantityLabel}
                        >
                            <Input
                                type={'number'}
                                name={`quantity`}
                                register={register}
                                errors={errors}
                                placeholder={placeholder.quantity}
                            />
                        </FormGroup>
                    </div>
                )}
            </div>

            {/* Tags */}
            <FormGroup
                classes={cx('col', 'l-4')}
                name={'tags'}
                label={context.tagsLabel}
                errors={errors}
            >
                <FormCreatable
                    name={'tags'}
                    control={control}
                    placeholder={'Nhập các tag'}
                    defaultValue={product.tags || []}
                />
            </FormGroup>
        </>
    );
}

export default BasicInput;
