import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import DateTimePicker from 'react-datetime-picker';
import ProgressBar from '@ramonak/react-progress-bar';
import { useDispatch, useSelector } from 'react-redux';

import { Title } from '~/components';
import { formatDate } from '~/utils/funcs';
import { statisticalServices } from '~/services';
import { enumStateOrder } from '~/utils/constant';
import { ChartBar } from '~/admin/components_pages';
import { statisticalAsync, statisticalSelector } from '~/redux';
import logger from '~/utils/logger';

import { cx } from './constant';

const randomColor = () => {
    let result = '';
    do {
        result = Math.floor(Math.random() * 16777215).toString(16);
    } while (result === 'e0e0de');
    return result;
};

function Dashboard() {
    const [categoryCount, setCategoryCount] = useState({
        totalQuantity: 0,
        list: [],
    });
    const [orderCount, setOrderCount] = useState({
        totalQuantity: 0,
        list: [],
    });
    const [productCount, setProductCount] = useState({
        totalQuantity: 0,
        list: [],
    });
    const [userCount, setUserCount] = useState({
        totalQuantity: 0,
        list: [],
    });
    const [startDate, setStartDate] = useState(new Date('12-01-2022'));
    const [endDate, setEndDate] = useState(new Date());
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const resultCount = await statisticalServices.getCountByState();
                const expectMessage = 'Get count by state success';

                if (resultCount?.message === expectMessage) {
                    const { data } = resultCount;

                    setCategoryCount(data.category);
                    setOrderCount(data.order);
                    setProductCount(data.product);
                    setUserCount(data.user);
                }
            } catch (error) {
                logger({ groupName: 'Dashboard catch', values: [error] });
            }
        };

        fetchApi();
    }, []);
    useEffect(() => {
        dispatch(
            statisticalAsync.getStatistical({
                from: formatDate(startDate),
                to: formatDate(endDate),
                type: 'month',
            }),
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate]);

    const { isLoading, statisticalAmount } = useSelector(
        statisticalSelector.getStatsAmount,
    );

    const onStartDate = (value) => {
        setStartDate(value);
    };

    const onEndDate = (value) => {
        setEndDate(value);
    };

    return (
        <>
            <Title as='h1'>Các số liệu thống kê</Title>
            <div className={cx('row')}>
                <div className={cx('col', 'l-4')}>
                    <div className={cx('section')}>
                        <Title as={'h2'}>Danh mục sản phẩm</Title>
                        <div className={cx('row')}>
                            {categoryCount.list.map((item, index) => (
                                <div key={index} className={cx('col', 'l-10')}>
                                    <Title as={'h3'}>
                                        {item.state === 'enable'
                                            ? 'Danh mục được phép xuất hiện'
                                            : 'Danh mục không được xuất hiện'}
                                    </Title>
                                    <ProgressBar
                                        completed={item.count.toString()}
                                        maxCompleted={
                                            categoryCount.totalQuantity
                                        }
                                        bgColor={'#' + randomColor()}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={cx('col', 'l-4')}>
                    <div className={cx('section')}>
                        <Title as={'h2'}>Người dùng</Title>
                        <div className={cx('row')}>
                            {userCount.list.map((item, index) => (
                                <div key={index} className={cx('col', 'l-10')}>
                                    <Title as={'h3'}>
                                        {item.state === 'active'
                                            ? 'Đã được kích hoạt'
                                            : 'Chưa được kích hoạt'}
                                    </Title>
                                    <ProgressBar
                                        completed={item.count.toString()}
                                        maxCompleted={userCount.totalQuantity}
                                        bgColor={'#' + randomColor()}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={cx('col', 'l-4')}>
                    <div className={cx('section')}>
                        <Title as={'h2'}>Sản phẩm</Title>
                        <div className={cx('row')}>
                            {productCount.list.map((item, index) => (
                                <div key={index} className={cx('col', 'l-10')}>
                                    <Title as={'h3'}>
                                        {item.state === 'enable'
                                            ? 'Sản phẩm được phép xuất hiện'
                                            : 'Sản phẩm không được xuất hiện'}
                                    </Title>
                                    <ProgressBar
                                        completed={item.count.toString()}
                                        maxCompleted={
                                            productCount.totalQuantity
                                        }
                                        bgColor={'#' + randomColor()}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={cx('col', 'l-12')}>
                    <div className={cx('section')}>
                        <Title as={'h2'}>Đơn hàng</Title>
                        <div className={cx('row')}>
                            {orderCount.list.map((item, index) => (
                                <div key={index} className={cx('col', 'l-6')}>
                                    <Title as={'h3'}>
                                        {enumStateOrder[item.state].state}
                                    </Title>
                                    <ProgressBar
                                        completed={item.count.toString()}
                                        maxCompleted={orderCount.totalQuantity}
                                        bgColor={'#' + randomColor()}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <br style={{ marginTop: '1rem' }} />

            <Title as={'h2'}>Thống kê tổng doanh thu</Title>

            <div className={cx('row')}>
                <div className={cx('col', 'l-4')}>
                    <Title classNames={cx('label-datetime-picker')} as={'h3'}>
                        Từ:
                    </Title>
                    <DateTimePicker
                        clearIcon={null}
                        value={startDate}
                        format='dd/MM/y'
                        onChange={onStartDate}
                    />
                </div>

                <div className={cx('col', 'l-4')}>
                    <Title classNames={cx('label-datetime-picker')} as={'h3'}>
                        Đến:
                    </Title>
                    <DateTimePicker
                        clearIcon={null}
                        value={endDate}
                        format='dd/MM/y'
                        onChange={onEndDate}
                    />
                </div>
            </div>

            {isLoading ? (
                <div className={cx('row', 'loading')}>
                    <TailSpin
                        width='100%'
                        height='80'
                        color='#4fa94d'
                        ariaLabel='tail-spin-loading'
                        radius='1'
                        wrapperStyle={{}}
                        wrapperClass=''
                        visible={true}
                    />
                </div>
            ) : (
                <ChartBar
                    data={statisticalAmount}
                    keyXAxis='date'
                    keyBar={'amount'}
                    name='Tổng doanh thu tháng'
                />
            )}
        </>
    );
}

export default Dashboard;
