import { toast } from 'react-toastify';

import { ButtonCustomize, Input, FormGroup } from '~/admin/components';
import { productServices } from '~/services';

import { cx, context, placeholder } from './constant';

function ProductInputOptions({ fields, register, append, remove, errors }) {
    const handleDeleteOption = async ({ index, itemId }) => {
        if (itemId) {
            const result = await productServices.deleteOptionProduct(itemId);

            if (result?.message === 'Delete Option successfully ') {
                toast.success('Xóa tùy chọn thành công');
            } else {
                toast.error('Xóa tùy chọn thất bại');
            }
        }

        remove(index);
    };

    return (
        <div className={cx('col', 'l-8')}>
            {fields.map((item, index) => (
                <div key={item.id} className={cx('row')}>
                    <div className={cx('col', 'l-6')}>
                        <div className={cx('row')}>
                            <FormGroup
                                classes={cx('col', 'l-12')}
                                name={`options.${index}.value`}
                                label={`Tùy chọn ${index + 1}`}
                            >
                                <Input
                                    type={'text'}
                                    name={`options.${index}.value`}
                                    register={register}
                                    errors={errors}
                                    placeholder={placeholder.value}
                                />
                            </FormGroup>
                            <FormGroup
                                classes={cx('col', 'l-12')}
                                name={`options.${index}.stock`}
                            >
                                <Input
                                    type={'number'}
                                    name={`options.${index}.stock`}
                                    register={register}
                                    errors={errors}
                                    placeholder={placeholder.stock}
                                />
                            </FormGroup>
                        </div>
                    </div>
                    <div
                        className={cx('col', 'l-6')}
                        style={{
                            alignSelf: 'flex-end',
                            marginBottom: '1.2rem',
                        }}
                    >
                        <ButtonCustomize
                            isDelete={true}
                            onClick={(event) => {
                                event.preventDefault();
                                handleDeleteOption({
                                    index,
                                    itemId: item.optionId,
                                });
                            }}
                        >
                            {context.deleteButton}
                        </ButtonCustomize>
                    </div>
                </div>
            ))}

            <ButtonCustomize
                isEdit={true}
                onClick={(event) => {
                    event.preventDefault();
                    append({ value: 'name', stock: 1 });
                }}
            >
                {context.addButton}
            </ButtonCustomize>

            {fields.length === 0 && (
                <div className={cx('row')}>
                    <FormGroup
                        classes={cx('col', 'l-8')}
                        name={`quantity`}
                        label={context.quantityLabel}
                    >
                        <Input
                            type={'number'}
                            name={`quantity`}
                            register={register}
                            errors={errors}
                            placeholder={placeholder.quantity}
                        />
                    </FormGroup>
                </div>
            )}
        </div>
    );
}

export default ProductInputOptions;
