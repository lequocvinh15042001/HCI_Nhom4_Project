import { Footer, Header } from '~/components_layout';

function NotBreadCrumb({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}

export default NotBreadCrumb;
