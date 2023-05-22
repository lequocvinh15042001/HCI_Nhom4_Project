import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Form, FormGroup, Input, Title } from '~/components';
import { authServices } from '~/services';
import { userActions, userSelector } from '~/redux';

import { cx, context, schema, form } from './constant';

function CheckOtpRegister() {
    const dispatch = useDispatch();
    const user = useSelector(userSelector.getUser);
    const [searchParams] = useSearchParams();

    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: user.email || searchParams.get('email'),
            otp: '',
        },
    });
    const navigate = useNavigate();

    const handleResend = async (event) => {
        event.preventDefault();
        const email = getValues(form.email);
        if (!email) {
            toast.error('Nhập email');
        }

        Swal.fire({
            title: 'Gửi OTP',
            didOpen: async () => {
                Swal.showLoading();
                const email = getValues('email');
                const result = await authServices.getOtp({
                    email: user.email || email,
                });
                const expectMessage = 'Send otp email success';

                if (result?.message === expectMessage) {
                    toast.success('Gửi OTP thành công');
                } else {
                    toast.error('Gửi OTP thất bại');
                }

                Swal.close();
            },
        });
    };
    const handleOnSubmit = async (data) => {
        const type = 'register';

        const result = await authServices.verifyOtp({ ...data, type });

        if (result?.data?.id) {
            dispatch(userActions.addUser(result.data));
            toast.success('OTP đã được xác nhận');
            navigate('/');
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
                    name={form.email}
                    label={context.emailLabel}
                    errors={errors}
                    isRequired
                >
                    <Input
                        name={form.email}
                        type={'text'}
                        register={register}
                        errors={errors}
                        isDisable={true}
                    />
                </FormGroup>

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

                <div className={cx('col', 'l-6', 'buttons')}>
                    <Button>{context.verify}</Button>
                </div>

                <div className={cx('col', 'l-6', 'buttons')}>
                    <Button onClick={handleResend}>{context.reSend}</Button>
                </div>
            </Form>
        </div>
    );
}

export default CheckOtpRegister;
