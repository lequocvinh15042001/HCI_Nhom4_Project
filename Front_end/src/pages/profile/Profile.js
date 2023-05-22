import Swal from 'sweetalert2';
import Avatar from 'react-avatar';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import { userServices } from '~/services';
import { avatarDefault } from '~/assets/images';
import { userSelector, userActions } from '~/redux';
import { Button, Form, Section, Title, Wrapper } from '~/components';
import logger from '~/utils/logger';

import { context, cx, schema } from './constant';

function Profile() {
    const user = useSelector(userSelector.getUser);
    const [file, setFile] = useState({
        preview: user?.avatar || avatarDefault,
    });
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: user.name,
            email: user.email,
            phone: user.phone,
        },
    });

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(file.preview);
        };
    }, [file]);
    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (name === 'avatar' && type === 'change') {
                setFile((prev) => {
                    const { 0: avatar } = value.avatar;

                    if (avatar) {
                        avatar.preview = URL.createObjectURL(avatar);
                        return avatar;
                    } else {
                        return prev;
                    }
                });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch]);

    const handleImage = ({ target: { files } }) => {
        setFile((prev) => {
            prev = files[0];
            prev.preview = URL.createObjectURL(prev);

            return prev;
        });
    };
    const handleOnSubmit = async (data) => {
        const { name, email, phone, avatar } = data;
        const formData = new FormData();

        if (avatar) {
            formData.append('avatar', avatar[0]);
        }

        Swal.fire({
            title: 'Cập nhật thông tin người dùng',
            didOpen: async () => {
                Swal.showLoading();
                if (name !== user.name || phone !== user.phone) {
                    const result = await userServices.updateUser(user.id, {
                        name,
                        email,
                        phone,
                    });
                    const expectMessage = 'Update info user successfully';

                    if (result?.message === expectMessage) {
                        toast.success('Cập nhật thành công');
                        dispatch(
                            userActions.updateUser({
                                name,
                                phone,
                                avatar: user.avatar,
                            }),
                        );
                    } else {
                        toast.error('Cập nhật thất bại');
                    }
                }

                if (avatar.length) {
                    const result = await userServices.uploadAvatar(
                        user.id,
                        formData,
                    );
                    const expectMessage = 'Update user success';
                    logger({
                        groupName: 'avatar update',
                        values: [result],
                    });

                    if (result?.message === expectMessage) {
                        toast.success('Thay đổi ảnh thành công');
                        dispatch(
                            userActions.updateUser({
                                name: user.name,
                                avatar: result.data.avatar,
                            }),
                        );
                    } else {
                        toast.error('Thay đổi ảnh thất bại');
                    }
                }

                Swal.close();
            },
        });
    };

    return (
        <Wrapper classnames={cx('wrapper')}>
            <div className={cx('grid', 'wide')}>
                <Section classNames={cx('section')}>
                    <Title as='h1' classNames={cx('title')}>
                        {context.title}
                    </Title>

                    <Form onSubmit={handleSubmit(handleOnSubmit)}>
                        {/* Avatar */}
                        <div className={cx('col', 'l-4', 'm-4', 's-12')}>
                            <div className={cx('avatar')}>
                                <Avatar
                                    src={file.preview || avatarDefault}
                                    size='200'
                                    round='100%'
                                    alt='anh dai dien'
                                />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Button className={cx('btn', 'btn--avatar')}>
                                    <input
                                        type='file'
                                        title=''
                                        className={cx('input-img')}
                                        onChange={handleImage}
                                        {...register('avatar')}
                                    />
                                    {context.avataButton}
                                </Button>
                            </div>
                        </div>

                        {/* Input */}
                        <div className={cx('col', 'l-8', 'm-8', 's-12')}>
                            <div className={cx('group')}>
                                <label
                                    htmlFor='name'
                                    className={cx(
                                        'label-input',
                                        'col',
                                        'l-4',
                                        'm-4',
                                        's-12',
                                    )}
                                >
                                    {context.name}
                                </label>
                                <span
                                    className={cx('col', 'l-8', 'm-8', 's-12')}
                                >
                                    <input
                                        id='name'
                                        placeholder={context.name}
                                        type='text'
                                        className={cx('input')}
                                        {...register('name')}
                                    />
                                    <span className={cx('input__error')}>
                                        {errors && errors.name?.message}
                                    </span>
                                </span>
                            </div>

                            <div className={cx('group')}>
                                <label
                                    htmlFor='email'
                                    className={cx(
                                        'label-input',
                                        'col',
                                        'l-4',
                                        'm-4',
                                        's-12',
                                    )}
                                >
                                    {context.email}
                                </label>
                                <span
                                    className={cx('col', 'l-8', 'm-8', 's-12')}
                                >
                                    <input
                                        placeholder={context.email}
                                        type='text'
                                        className={cx('input', 'disable')}
                                        {...register('email')}
                                    />
                                </span>
                            </div>
                            <div className={cx('group')}>
                                <label
                                    htmlFor='phone'
                                    className={cx(
                                        'label-input',
                                        'col',
                                        'l-4',
                                        'm-4',
                                        's-12',
                                    )}
                                >
                                    {context.phone}
                                </label>
                                <span
                                    className={cx('col', 'l-8', 'm-8', 's-12')}
                                >
                                    <input
                                        placeholder={context.phone}
                                        type='number'
                                        className={cx('input', 'input--number')}
                                        onWheel={(e) => e.target.blur()}
                                        {...register('phone')}
                                    />
                                    <span className={cx('input__error')}>
                                        {errors && errors.phone?.message}
                                    </span>
                                </span>
                            </div>

                            <div className={cx('group', 'group--center')}>
                                <span className={cx('col', 'l-4')}>
                                    <Button solid={true} className={cx('btn')}>
                                        {context.editButton}
                                    </Button>
                                </span>
                            </div>
                        </div>
                    </Form>
                </Section>
            </div>
        </Wrapper>
    );
}

export default Profile;
