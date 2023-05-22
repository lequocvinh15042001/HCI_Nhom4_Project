import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { Button, Form, FormGroup, Input, Title } from '~/components';
// import * as services from '~/services/services';
import { authServices } from '~/services';
import { userActions, userSelector } from '~/redux';

import { cx, context, schema, defaultValues, form } from './constant';
import { pathNames } from '~/routes';

function LoginAdmin() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues,
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(userSelector.getUser);

    useEffect(() => {
        if (user.id) {
            if (user.role === 'role_admin') {
                navigate('/admin/dashboard');
            } else {
                navigate(pathNames.home);
            }
        }
    }, [user, navigate]);

    const handleOnSubmit = async (data) => {
        const result = await authServices.login(data);

        if (result) {
            dispatch(userActions.addUser(result));
            dispatch(userActions.showedToast());
            navigate('/admin/dashboard');
        } else {
            toast.error('Email hoặc mật khẩu không đúng');
        }
    };

    return (
        <div className={cx('row', 'wrapper')}>
            <div className={cx('col', 'l-6', 'side-left')}></div>
            <div className={cx('col', 'l-6')}>
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
                        />
                    </FormGroup>
                    <FormGroup
                        classes={cx('col', 'l-12')}
                        name={form.password}
                        label={context.passwordLabel}
                        errors={errors}
                        isRequired
                    >
                        <Input
                            name={form.password}
                            type={form.password}
                            register={register}
                            errors={errors}
                        />
                    </FormGroup>

                    <div className={cx('col', 'l-12', 'buttons')}>
                        <Button solid={true}>{context.login}</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default LoginAdmin;
