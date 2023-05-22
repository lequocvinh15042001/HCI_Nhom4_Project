import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isExpired } from 'react-jwt';
import { useDispatch } from 'react-redux';

import { pathNames } from '~/routes';
import { userSelector, userActions } from '~/redux';

function AdminRoutes() {
    const user = useSelector(userSelector.getUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isExpired(user.accessToken)) {
            dispatch(userActions.resetUser());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isExpired(user.accessToken)) {
        return <Navigate to={pathNames.loginAdmin} />;
    } else {
        return user.role === 'role_admin' ? (
            <Outlet />
        ) : (
            <Navigate to={pathNames.loginAdmin} />
        );
    }
}

export default AdminRoutes;
