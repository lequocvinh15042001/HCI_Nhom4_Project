import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Form, FormGroup, Input } from '~/components';

import { cx, context, placeholder, schema } from './constant';

function AddressForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleOnSubmit = (data) => console.log(data);

    return (
        <Form onSubmit={handleSubmit(handleOnSubmit)}>
            <FormGroup
                classes={cx('col', 'l-12')}
                name={'address'}
                label={'Địa chỉ'}
                errors={errors}
                isRequired
            >
                <Input
                    classes={cx('input')}
                    name={'address'}
                    type={'text'}
                    placeholder={placeholder.address}
                    register={register}
                    errors={errors}
                />
            </FormGroup>
            <FormGroup
                classes={cx('col', 'l-12')}
                name={'phone'}
                label={'Số điện thoại'}
                errors={errors}
                isRequired
            >
                <Input
                    classes={cx('input')}
                    name={'phone'}
                    type={'tel'}
                    placeholder={placeholder.phone}
                    register={register}
                    errors={errors}
                />
            </FormGroup>

            <FormGroup classes={cx('col', 'l-12')}>
                <Input
                    classes={cx('input', 'input-checkbox')}
                    name={'default'}
                    type={'checkbox'}
                    register={register}
                    errors={errors}
                />
                <span>{context.setDefault}</span>
            </FormGroup>
            <div className={cx('col', 'l-12', 'group')}>
                <Button solid className={cx('btn')}>
                    <FontAwesomeIcon
                        className={cx('font-icon')}
                        icon={faCheck}
                    />
                    {context.addAddressBtn}
                </Button>
            </div>
        </Form>
    );
}

export default AddressForm;
