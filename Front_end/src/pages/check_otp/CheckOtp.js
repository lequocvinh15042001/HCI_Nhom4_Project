import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Form, FormGroup, Input, Title } from '~/components';
// import * as services from '~/services/services';
import { authServices } from '~/services';
import { userActions, userSelector } from '~/redux';

import { cx, context, schema, defaultValues, form } from './constant';

function CheckOtp() {
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
        const email = user.email;
        const type = 'reset';
        const result = await authServices.verifyOtp({ ...data, email, type });

        if (result?.data?.id) {
            toast.success('OTP đã được xác nhận');
            dispatch(
                userActions.addUser({
                    ...result.data,
                    accessToken: result.data.token,
                }),
            );
            navigate('/reset-password');
        } else {
            toast.error('Mã OTP không đúng');
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
                    name={form.otp}
                    label={context.otpLabel}
                    errors={errors}
                    isRequired
                >
                    <Input
                        name={form.otp}
                        type={'text'}
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

export default CheckOtp;
