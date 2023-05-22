import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
// import { TailSpin } from 'react-loader-spinner';

import { ButtonPagination, ProductCard, Title } from '~/components';
import { productServices, searchServices } from '~/services';

import { cx, context } from './constant';

function Search() {
    const [searchParams] = useSearchParams();
    const [searchResult, setSearchResult] = useState({});
    // const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchApi = async ({ q, category, page, size }) => {
            if (category) {
                const errorMessage = `Can not found any product with category or brand id: ${category}`;

                try {
                    const result = await productServices.getProductsByCategory({
                        id: category,
                        page,
                        size,
                    });

                    setSearchResult(result);
                } catch (error) {
                    // const selector = '> useEffect > fetchApi';
                    // logger({
                    //     groupName: `${pathname} ${selector}`,
                    //     values: [error],
                    // });

                    if (error === errorMessage) {
                        setSearchResult((prev) => ({
                            ...prev,
                            list: [],
                            totalQuantity: 0,
                        }));
                    }
                }
                // setIsLoading(false);

                return;
            }

            if (q) {
                try {
                    const result = await searchServices.searchProducts({
                        q,
                        page,
                        size,
                    });

                    if (result?.totalQuantity) {
                        setSearchResult(result);
                    }
                } catch (error) {
                    setSearchResult({});
                }
            } else {
                const result = await productServices.getProductsByState({
                    page,
                    size,
                });
                if (result?.totalQuantity) {
                    setSearchResult(result);
                }
            }
            // setIsLoading(false);
        };

        fetchApi({
            q: searchParams.get('q'),
            category: searchParams.get('category'),
            page: searchParams.get('page') || 0,
            size: 25,
        });
    }, [searchParams]);

    return (
        <div className={cx('wrapper')}>
            {/* Products */}
            <div className={cx('section')}>
                <div className={cx('grid', 'wide')}>
                    <Title line center as={'h1'}>
                        {context.title}
                    </Title>

                    {searchResult?.totalQuantity !== undefined && (
                        <Title center as={'h2'}>
                            {searchResult.totalQuantity
                                ? context.searchResult(
                                      searchResult.totalQuantity,
                                  )
                                : context.listEmpty}
                        </Title>
                    )}

                    <div className={cx('row')}>
                        {!!searchResult.totalQuantity &&
                            searchResult.list.map((item, index) => (
                                <div
                                    key={index}
                                    className={cx('col', 'l-2-4', 'm-4', 's-6')}
                                >
                                    <ProductCard key={index} product={item} />
                                </div>
                            ))}

                        <ButtonPagination
                            displayPages={2}
                            totalPage={searchResult.totalPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
