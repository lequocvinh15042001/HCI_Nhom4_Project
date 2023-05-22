import { useParams } from 'react-router-dom';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState, useCallback } from 'react';
import slugify from 'slugify';
import Swal from 'sweetalert2';

import { Button, Title } from '~/components';
import {
    ButtonCustomize,
    FormQuill,
    UploadImage,
    Form,
    FormGroup,
} from '~/admin/components';
import { productServices } from '~/services';

import {
    context,
    cx,
    formatsDescription,
    formatsSummary,
    modulesDescription,
    modulesSummary,
    schema,
    defaultValues,
    productValues,
} from './constant';
import { BasicInput } from './components';

const addProduct = ({ data, options, formData }) => {
    let isSuccess = false;

    Swal.fire({
        title: 'Thêm sản phẩm',
        didOpen: async () => {
            Swal.showLoading();
            const result = await productServices.addProduct(data);
            const {
                data: { id },
            } = result;

            if (result.isSuccess === 'true') {
                options.forEach(async (item) => {
                    await productServices.addOptionProduct({ id, data: item });
                });
                await productServices.addImagesProduct({ id, data: formData });

                isSuccess = true;
            }

            Swal.close();
        },
    }).then(() => {
        Swal.fire({
            title: `Thêm sản phẩm ${isSuccess ? 'thành công' : 'thất bại'}`,
            confirmButtonText: 'Xác nhận',
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                window.location.reload();
            }
        });
    });
};

const updateProduct = ({ id, options, data }) => {
    let isSuccess = false;

    Swal.fire({
        title: 'Chỉnh sửa sản phẩm',
        didOpen: async () => {
            Swal.showLoading();
            const result = await productServices.editProduct({ id, data });

            if (result.isSuccess === 'true') {
                options.forEach(async (item) => {
                    if (item.optionId) {
                        await productServices.editOptionProduct({
                            id: item.optionId,
                            data: item,
                        });
                    } else {
                        await productServices.addOptionProduct({
                            id,
                            data: item,
                        });
                    }
                });

                isSuccess = true;
            }

            Swal.close();
        },
    }).then(() => {
        Swal.fire({
            title: `Chỉnh sửa sản phẩm ${
                isSuccess ? 'thành công' : 'thất bại'
            }`,
            confirmButtonText: 'Xác nhận',
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                window.location.reload();
            }
        });
    });
};

// Component
function ProductForm() {
    // Hooks
    const [product, setProduct] = useState({});
    const { id } = useParams();

    const {
        register,
        control,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues,
    });
    const { fields, append, remove, insert } = useFieldArray({
        control,
        name: 'options',
    });
    const fetchApi = useCallback(
        async (id) => {
            if (id) {
                const resultProduct = await productServices.getProduct(id);

                if (resultProduct) {
                    productValues.forEach((item) => {
                        setValue(
                            item.name,
                            resultProduct[item.property] || item.defaultValue,
                        );
                    });

                    resultProduct.options.forEach((item, index) => {
                        insert(index, {
                            optionId: item.id,
                            value: item.value,
                            stock: item.stock,
                        });
                        setValue(`options.${index}.optionId`, item.id);
                        setValue(`options.${index}.value`, item.value);
                        setValue(`options.${index}.stock`, item.stock);
                    });

                    const newTags = resultProduct?.tags.map((item, index) => ({
                        label: item,
                        value: index,
                    }));

                    setValue('tags', newTags);
                }

                setProduct({
                    ...resultProduct,
                    state: resultProduct?.state || '',
                });
            }
        },
        [insert, setValue],
    );

    useEffect(() => {
        fetchApi(id);
    }, [fetchApi, id]);

    // Hanlde event
    const handleOnSubmit = async (data) => {
        const newSale = parseFloat(data.sale);
        const newTags = data.tags.map((item) => item.label);
        const newSlugify = slugify(data.name);
        const formData = new FormData();

        data.images.forEach((image) => {
            if (image.preview) {
                formData.append('url', image);
            }
        });

        if (data.options.length) {
            data.quantity = 0;
            data.options.forEach((option) => {
                option.stock = parseInt(option.stock);
                data.quantity += option.stock;
            });
        }

        const newData = {
            name: data.name,
            slugify: newSlugify,
            price: data.price,
            sale: newSale,
            category: data.category,
            category_id: product.category_id,
            quantity: data.quantity,
            tags: newTags,
            summary: data.summary,
            description: data.description,
            state: product.state,
        };

        if (id) {
            updateProduct({ id, options: data.options, data: newData });
        } else {
            addProduct({ data: newData, options: data.options, formData });
        }
    };

    return (
        <>
            <Title as='h1'>{id ? context.titleEdit : context.titleAdd}</Title>
            <Button to={'/admin/products'}>{context.backToProductsPage}</Button>

            <Form onSubmit={handleSubmit(handleOnSubmit)}>
                {id ? (
                    product?.id && (
                        <BasicInput
                            product={product}
                            register={register}
                            control={control}
                            fields={fields}
                            append={append}
                            remove={remove}
                            errors={errors}
                        />
                    )
                ) : (
                    <BasicInput
                        product={product}
                        register={register}
                        control={control}
                        fields={fields}
                        append={append}
                        remove={remove}
                        errors={errors}
                    />
                )}

                {/* Summary */}
                <FormGroup
                    classes={cx('col', 'l-12')}
                    name={'summary'}
                    label={context.summaryLabel}
                    errors={errors}
                >
                    <FormQuill
                        name='summary'
                        control={control}
                        formats={formatsSummary}
                        modules={modulesSummary}
                    />
                </FormGroup>

                {/* Description */}
                <FormGroup
                    classes={cx('col', 'l-12')}
                    name={'description'}
                    label={context.descriptionLabel}
                    errors={errors}
                >
                    <FormQuill
                        name='description'
                        control={control}
                        formats={formatsDescription}
                        modules={modulesDescription}
                    />
                </FormGroup>

                {/* Images */}
                <FormGroup
                    classes={cx('col', 'l-12')}
                    name={'images'}
                    label={context.imagesLabel}
                    errors={errors}
                >
                    {id ? (
                        product.images && (
                            <Controller
                                name='images'
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <UploadImage
                                        id={id}
                                        value={product.images}
                                        onChange={(files) => onChange(files)}
                                        isMultiple
                                        colBase={'l-3'}
                                    />
                                )}
                            />
                        )
                    ) : (
                        <Controller
                            name='images'
                            control={control}
                            render={({ field: { onChange } }) => (
                                <UploadImage
                                    onChange={(files) => onChange(files)}
                                    isMultiple
                                    colBase={'l-3'}
                                />
                            )}
                        />
                    )}
                </FormGroup>

                <div
                    className={cx('col', 'l-12')}
                    style={{ marginTop: '1.4rem' }}
                >
                    <ButtonCustomize isEdit={true}>
                        {id ? context.titleEdit : context.addBtn}
                    </ButtonCustomize>
                </div>
            </Form>
        </>
    );
}

export default ProductForm;
