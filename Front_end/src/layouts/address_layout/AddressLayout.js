import { useLocation } from 'react-router-dom';

import { Button, Section, Title, Wrapper } from '~/components';
import { BreadCrumb, Footer, Header } from '~/components_layout';
import { pathNames } from '~/routes';

import { cx, context } from './constant';

function AddressLayout({ children }) {
    const location = useLocation();

    return (
        <>
            <Header />
            <BreadCrumb />
            <Wrapper>
                <div className={cx('grid', 'wide')}>
                    <Section classNames={cx('containter')}>
                        <div className={cx('row')}>
                            <div className={cx('col', 'l-12')}>
                                <Title as='h1' line>
                                    {context.title}
                                </Title>
                            </div>
                            <div className={cx('col', 'l-12')}>
                                <Button
                                    solid
                                    navTo={
                                        location.pathname ===
                                        pathNames.addressForm
                                            ? pathNames.addresses
                                            : pathNames.addressForm
                                    }
                                >
                                    {location.pathname === pathNames.addressForm
                                        ? context.backPageAddresses
                                        : context.addAddressBtn}
                                </Button>
                            </div>
                        </div>
                        {children}
                    </Section>
                </div>
            </Wrapper>
            <Footer />
        </>
    );
}

export default AddressLayout;
