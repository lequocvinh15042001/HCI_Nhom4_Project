import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import { Button, Title } from '~/components';
import {
    ButtonCustomize,
    Form,
    FormGroup,
    Input,
    UploadImage,
} from '~/admin/components';
import { categoryServices } from '~/services';

import { context, schema, defaultValues, cx } from './constant';
import { useEffect, useState } from 'react';

const updateCategory = ({ id, name, state, image, formData }) => {
    Swal.fire({
        title: 'Chỉnh sửa danh mục sản phẩm',
        didOpen: async () => {
            Swal.showLoading();
            const result = await categoryServices.updateCategory(id, {
                name,
                state,
            });

            if (result.isSuccess === 'true') {
                toast.success('Chỉnh sửa danh mục thành công');
            } else {
                toast.error('Chỉnh sửa danh mục thất bại');
            }

            if (typeof image[0] !== 'string') {
                const resultImage = await categoryServices.updateImageCategory(
                    result.data.id,
                    formData,
                );

                if (resultImage.isSuccess === 'true') {
                    toast.success('Chỉnh sửa ảnh thành công');
                } else {
                    toast.success('Chỉnh sửa ảnh thất bại');
                }
            }

            Swal.close();
        },
    });
};

const createCategory = ({ name, formData }) => {
    Swal.fire({
        title: 'Thêm danh mục sản phẩm',
        didOpen: async () => {
            Swal.showLoading();
            const errorMessage =
                'Insert Category Fail Because Category Name exist';
            // const expectMessage = 'Get category success';
            try {
                const result = await categoryServices.addCategory({
                    name,
                    state: 'enable',
                });

                const resultImage = await categoryServices.updateImageCategory(
                    result.data.id,
                    formData,
                );

                if (resultImage.isSuccess === 'true') {
                    toast.success('Thêm danh mục thành công');
                }
            } catch (error) {
                switch (error) {
                    case errorMessage:
                        toast.error('Tên danh mục bị trùng');
                        break;
                    default:
                        toast.error('Thêm danh mục thất bại');
                        break;
                }
            }

            Swal.close();
        },
    });
};

function CategoryForm() {
    // Hooks
    const [category, setCategory] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchApi = async () => {
            if (id) {
                const result = await categoryServices.getCategoryById(id);

                if (result) {
                    setValue('name', result.name || '');
                    setValue('image', [result.categoryimage] || []);
                    setCategory(result);
                }
            }
        };

        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    // Hanlde event
    const handleOnSubmit = async (data) => {
        const formData = new FormData();
        formData.append('categoryimage', data.image[0]);

        if (id) {
            updateCategory({
                id,
                name: data.name,
                state: category.state,
                image: data.image,
                formData,
            });
        } else {
            createCategory({ name: data.name, formData });
        }
    };

    return (
        <>
            <Title as='h1'>{id ? context.titleEdit : context.titleAdd}</Title>
            <Button to={'/admin/categories'}>
                {context.backToCategoriesPage}
            </Button>

            <Form onSubmit={handleSubmit(handleOnSubmit)}>
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
                    />
                </FormGroup>

                <FormGroup
                    classes={cx('col', 'l-12')}
                    name={'image'}
                    label={context.imageLabel}
                    errors={errors}
                    isRequired
                >
                    {id ? (
                        category.categoryimage && (
                            <Controller
                                name='image'
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <UploadImage
                                        value={[category.categoryimage]}
                                        onChange={(files) => onChange(files)}
                                        colBase={'l-12'}
                                    />
                                )}
                            />
                        )
                    ) : (
                        <Controller
                            name='image'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <UploadImage
                                    value={value}
                                    onChange={(files) => onChange(files)}
                                    colBase={'l-12'}
                                />
                            )}
                        />
                    )}
                </FormGroup>

                <FormGroup classes={cx('col', 'l-12')}>
                    <ButtonCustomize isEdit={true}>
                        {id ? context.editBtn : context.addBtn}
                    </ButtonCustomize>
                </FormGroup>
            </Form>
        </>
    );
}

export default CategoryForm;
