import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ProductItem } from '~/admin/components';
import { productsAsync, productsSelector } from '~/redux';
import { Button, ButtonPagination, Table, Title } from '~/components';

import { context, cx, heads } from './constant';

function Products() {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {
        items: products,
        totalPage,
        isLoading,
    } = useSelector(productsSelector.getProductsAdmin);

    const itemPerPage = 5;
    const displayPages = 5;
    const firstPage = 1;
    const currentPage = searchParams.get('page') || firstPage;

    useEffect(() => {
        dispatch(
            productsAsync.getAllProductByAdmin({
                page: currentPage - 1,
                size: itemPerPage,
            }),
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    return (
        <>
            <Title as='h1'>{context.title}</Title>
            <Button to={'/admin/product-form'}>{context.addButton}</Button>

            <Table classes={cx('table')} heads={heads} isLoading={isLoading}>
                {products.map((item, index) => (
                    <ProductItem key={index} product={item} />
                ))}
            </Table>

            <ButtonPagination
                currentPage={searchParams.get('page') || firstPage}
                displayPages={displayPages}
                totalPage={totalPage}
            />
        </>
    );
}

export default Products;
