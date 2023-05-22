import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

import { Title } from '~/components';
import { pathNames } from '~/routes';
import { authServices } from '~/services';
import { userActions, userSelector } from '~/redux';

import { cx, context, form, schema, defaultValues } from './constant';

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues,
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector(userSelector.getUserId);

    useEffect(() => {
        if (userId) {
            navigate(pathNames.home);
        }
    }, [userId, navigate]);

    const handleSubmitData = async (data) => {
        const user = await authServices.login(data);

        if (user) {
            dispatch(userActions.addUser(user));
            navigate(pathNames.home);
        } else {
            toast.error('Tài khoản không đúng hoặc email chưa xác nhận');
        }
    };

    return (
        <form
            onSubmit={handleSubmit(handleSubmitData)}
            className={cx('wrapper')}
        >
            <Title line center as='h1'>
                {context.title}
            </Title>
            <div className={cx('form')}>
                <div className={cx('group')}>
                    <label className={cx('label-input')}>
                        {context.emailLabel}
                        <span>*</span>
                    </label>
                    <input
                        type={'text'}
                        className={cx('input', {
                            'invalid-input': !!errors.email?.message,
                        })}
                        placeholder={context.emailPlaceholder}
                        {...register(form.email)}
                    />
                    <span className={cx('invalid-message')}>
                        {errors.email?.message}
                    </span>
                </div>
                <div className={cx('group')}>
                    <label className={cx('label-input')}>
                        {context.passwordLabel}
                        <span>*</span>
                    </label>
                    <input
                        type={'password'}
                        className={cx('input', {
                            'invalid-input': !!errors.password?.message,
                        })}
                        placeholder={context.passwordPlaceholder}
                        {...register(form.password)}
                    />
                    <span className={cx('invalid-message')}>
                        {errors.password?.message}
                    </span>
                </div>
            </div>
            <div className={cx('text-center', 'line')}>
                <button type='submit' className={cx('btn-login')}>
                    {context.login}
                </button>
                <Link
                    className={cx('link-forgot-password')}
                    to={pathNames.sendOtp}
                >
                    {context.forgotPass}
                </Link>
            </div>
            <div className={cx('text-center')}>
                <span className={cx('message')}>{context.messageSignIn}</span>
                <Link className={cx('link')} to={pathNames.register}>
                    {context.createAcc}
                </Link>
            </div>
        </form>
    );
}

export default Login;
