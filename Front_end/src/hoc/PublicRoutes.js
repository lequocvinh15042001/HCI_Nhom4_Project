import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isExpired } from 'react-jwt';

import { userActions, userSelector } from '~/redux';

function PublicRoutes() {
    const { accessToken } = useSelector(userSelector.getUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isExpired(accessToken)) {
            dispatch(userActions.resetUser());
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Outlet />;
}

export default PublicRoutes;
