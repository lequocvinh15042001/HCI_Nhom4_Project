import classNames from 'classnames/bind';
import { Button } from '~/components';
import styles from './ButtonCustomize.module.scss';

const cx = classNames.bind(styles);

function ButtonCustomize({ children, isEdit, isDelete, isRead, ...props }) {
    const preflix = 'btn';

    const classes = cx(preflix, {
        [`${preflix}--edit`]: isEdit,
        [`${preflix}--delete`]: isDelete,
        [`${preflix}--read`]: isRead,
    });

    return (
        <Button solid={true} className={classes} {...props}>
            {children}
        </Button>
    );
}

export default ButtonCustomize;
