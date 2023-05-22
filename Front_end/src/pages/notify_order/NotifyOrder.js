// http://localhost:3000/redirect/payment?success=true&cancel=false

import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { pathNames } from '~/routes';

function NotifyOrder() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const success = searchParams.get('success') === 'true';
    const cancel = searchParams.get('cancel') === 'true';

    Swal.fire({
        icon: success ? 'success' : 'error',
        title: cancel ? 'Hủy đơn hàng' : 'Thanh toán thành công',
        confirmButtonText: success ? 'Về trang chủ' : 'Về giỏ hàng',
        allowOutsideClick: false,
    }).then((result) => {
        if (result.isConfirmed) {
            let endPoint = 'cart';

            if (success) {
                endPoint = 'home';
            }
            navigate(pathNames[endPoint]);
        }
    });

    return <div style={{ width: '100vw', height: '100vh' }}></div>;
}

export default NotifyOrder;
