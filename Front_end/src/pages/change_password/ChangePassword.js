import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Button, Form, FormGroup, Input, Title } from '~/components';
import { userSelector } from '~/redux';
import { userServices } from '~/services';
import { cx, context, schema } from './constant';

function ChangePassword() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            oldPassword: '',
            newPassword: '',
        },
    });
    const navigate = useNavigate();
    const user = useSelector(userSelector.getUser);

    const handleOnSubmit = async (data) => {
        const id = user.id;
        const oldpass = data.oldPassword;
        const newpass = data.newPassword;
        const result = await userServices.changePassword(id, {
            oldpass,
            newpass,
        });

        if (result?.message === 'Change password success') {
            toast.success('Thay đổi mật khẩu thành công');
            navigate('/profile');
        } else {
            toast.error('Thay đổi mật khẩu thất bại');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Title as='h1' line center={true} classNames={cx('title')}>
                {context.title}
            </Title>

            <Form onSubmit={handleSubmit(handleOnSubmit)}>
                <FormGroup
                    classes={cx('col', 'l-12')}
                    name={'oldPassword'}
                    label={context.oldPassword}
                    errors={errors}
                    isRequired
                >
                    <Input
                        name={'oldPassword'}
                        type={'password'}
                        register={register}
                        errors={errors}
                    />
                </FormGroup>

                <FormGroup
                    classes={cx('col', 'l-12')}
                    name={'newPassword'}
                    label={context.newPassword}
                    errors={errors}
                    isRequired
                >
                    <Input
                        name={'newPassword'}
                        type={'password'}
                        register={register}
                        errors={errors}
                    />
                </FormGroup>

                <div className={cx('col', 'l-12', 'buttons')}>
                    <Button>{context.changePasswordButton}</Button>
                </div>
            </Form>
        </div>
    );
}

export default ChangePassword;
