import classNames from 'classnames/bind';

import styles from './AdminLayout.module.scss';
import { Footer, Sidebar } from '~/components_layout';
import { Section, Wrapper } from '~/admin/components';

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
    return (
        <>
            <div className={cx('wrapper')}>
                <Sidebar />
                <Wrapper>
                    <Section>{children}</Section>
                </Wrapper>
            </div>
            <Footer />
        </>
    );
}

export default AdminLayout;
