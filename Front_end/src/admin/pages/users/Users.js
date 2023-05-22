import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { UserItem } from '~/admin/components_pages';
import { ButtonPagination, Table, Title } from '~/components';
import { usersAsync, userSelector } from '~/redux';

import { context, heads } from './constant';

function Users() {
    const [searchParams] = useSearchParams();
    const {
        items: users,
        totalPage,
        isLoading,
    } = useSelector(userSelector.getUsers);
    const dispatch = useDispatch();

    const page = searchParams.get('page') || 1;
    const displayPages = totalPage;

    useEffect(() => {
        dispatch(usersAsync.getUsers({ page: page - 1 }));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return (
        <>
            <Title as='h1'>{context.title}</Title>

            <Table heads={heads} isLoading={isLoading}>
                {users.map((item, index) => (
                    <UserItem
                        key={index}
                        user={item}
                        callback={() =>
                            dispatch(usersAsync.getUsers({ page: page - 1 }))
                        }
                    />
                ))}
            </Table>

            <ButtonPagination
                currentPage={page}
                displayPages={displayPages}
                totalPage={totalPage}
            />
        </>
    );
}

export default Users;
