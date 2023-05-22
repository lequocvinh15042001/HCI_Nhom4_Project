import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Form, FormGroup, Input, Title } from '~/components';
import { userServices } from '~/services';
import { userActions, userSelector } from '~/redux';

import { cx, context, schema, defaultValues, form } from './constant';

function ResetPassword() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues,
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(userSelector.getUser);

    const handleOnSubmit = async (data) => {
        const id = user.id;
        const resetpass = data.password;
        const result = await userServices.resetPassword(id, { resetpass });

        if (result?.data?.id) {
            toast.success('Đặt lại mật khẩu thành công');
            dispatch(userActions.resetUser());
            navigate('/login');
        } else {
            toast.error('Đặt lại mật khẩu thất bại');
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
                    name={form.password}
                    label={context.passwordLabel}
                    errors={errors}
                    isRequired
                >
                    <Input
                        name={form.password}
                        type={'password'}
                        register={register}
                        errors={errors}
                    />
                </FormGroup>

                <div className={cx('col', 'l-12', 'buttons')}>
                    <Button>{context.button}</Button>
                </div>
            </Form>
        </div>
    );
}

export default ResetPassword;
