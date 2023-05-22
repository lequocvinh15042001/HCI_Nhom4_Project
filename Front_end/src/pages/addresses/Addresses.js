// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowRotateLeft, faTrash } from '@fortawesome/free-solid-svg-icons';

// import { addresses } from '~/utils/constant';
// import { cx, context } from './constant';
// import { Button } from '~/components';

function Addresses() {
    return (
        <></>
        // <ul className={cx('addresses')}>
        //     {addresses.map((item, index) => (
        //         <li key={index} className={cx('address')}>
        //             <div className={cx('group')}>
        //                 <span className={cx('field')}>{context.name}</span>
        //                 <span className={cx('text')}>{item.name}</span>
        //                 {item.setDefault ? (
        //                     <span className={cx('default')}>
        //                         ({context.default})
        //                     </span>
        //                 ) : (
        //                     <></>
        //                 )}
        //             </div>
        //             <div className={cx('group')}>
        //                 <span className={cx('field')}>{context.address}</span>
        //                 <span className={cx('text')}>{item.address}</span>
        //             </div>
        //             <div className={cx('group')}>
        //                 <span className={cx('field')}>{context.phone}</span>
        //                 <span className={cx('text')}>{item.phone}</span>
        //             </div>
        //             <div className={cx('group')}>
        //                 <Button solid className={cx('btn')}>
        //                     <FontAwesomeIcon
        //                         className={cx('font-icon')}
        //                         icon={faArrowRotateLeft}
        //                     />
        //                     {context.editAddressBtn}
        //                 </Button>
        //                 <Button solid className={cx('btn')}>
        //                     <FontAwesomeIcon
        //                         className={cx('font-icon')}
        //                         icon={faTrash}
        //                     />
        //                     {context.deleteAddressBtn}
        //                 </Button>
        //             </div>
        //         </li>
        //     ))}
        // </ul>
    );
}

export default Addresses;
