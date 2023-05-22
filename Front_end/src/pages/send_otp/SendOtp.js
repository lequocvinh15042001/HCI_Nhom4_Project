import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { Button, Form, FormGroup, Input, Title } from '~/components';
import { userActions } from '~/redux';
import { authServices } from '~/services';

import { cx, context, schema, defaultValues, form } from './constant';

function SendOtp() {
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

    const handleOnSubmit = ({ email }) => {
        Swal.fire({
            title: 'Gửi OTP',
            didOpen: async () => {
                Swal.showLoading();
                const errorMessage = `Can not found user with email ${email} is activated`;
                const expectMessage = 'Send otp email success';

                try {
                    const result = await authServices.getOtpReset({ email });

                    if (result?.message === expectMessage) {
                        toast.success('Gửi OTP thành công');
                        dispatch(userActions.addUser({ email }));
                        navigate('/check-otp');
                    }
                } catch (error) {
                    if (error === errorMessage) {
                        toast.error(`${email} không tồn tại`);
                    } else {
                        toast.error('Gửi OTP thất bại');
                    }
                }

                Swal.close();
            },
        });
    };

    return (
        <div className={cx('wrapper')}>
            <Title as='h1' line center={true} classNames={cx('title')}>
                {context.title}
            </Title>
            <Title as='h3' center={true} classNames={cx('title')}>
                {context.subTitle}
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
                    />
                </FormGroup>

                <div className={cx('col', 'l-12', 'buttons')}>
                    <Button>{context.button}</Button>
                </div>
            </Form>
        </div>
    );
}

export default SendOtp;
