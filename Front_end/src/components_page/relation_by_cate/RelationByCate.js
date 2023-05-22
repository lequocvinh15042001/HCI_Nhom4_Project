import { Fragment, useEffect, useState } from 'react';

import { ProductCard, Title, Slick } from '~/components';
import { productServices } from '~/services';

import { context } from './constant';

function RelationByCate({ productId, categoryId }) {
    const [list, setList] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const result = await productServices.getProductsByCategory({
                id: categoryId,
                page: 0,
                size: 10,
            });

            setList(result.list.filter((item) => item.id !== productId));
        };

        fetch();
    }, [categoryId, productId]);

    return (
        <Fragment>
            <Title as='h2' line>
                {context.relation}
            </Title>

            {!!list.length && (
                <Slick
                    list={list}
                    component={ProductCard}
                    nameProp={'product'}
                />
            )}
        </Fragment>
    );
}

export default RelationByCate;
