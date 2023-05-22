import { Fragment, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { adminRoutes, pathNames, privateRoutes, publicRoutes } from './routes';
import { DefaultLayout } from './layouts';
import { PrivateRoutes, AdminRoutes, PublicRoutes } from './hoc';
import { categoriesAsync } from './redux';
import { Modal } from './components';
import logger from './utils/logger';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(categoriesAsync.getAllCategory());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    logger({ groupName: 'App', values: ['re-render'] });

    return (
        <BrowserRouter>
            <Routes>
                {/* Public */}
                <Route element={<PublicRoutes />}>
                    {publicRoutes.map((item, index) => {
                        const Page = item.component;
                        let Layout = DefaultLayout;

                        if (item.layout) {
                            Layout = item.layout;
                        } else if (item.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={item.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Route>

                {/* Private */}
                <Route element={<PrivateRoutes />}>
                    {privateRoutes.map((item, index) => {
                        const Page = item.component;
                        let Layout = DefaultLayout;

                        if (item.layout) {
                            Layout = item.layout;
                        } else if (item.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={item.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Route>

                {/* Admin */}
                <Route path={pathNames.admin} element={<AdminRoutes />}>
                    {adminRoutes.map((item, index) => {
                        const Page = item.component;
                        let Layout = DefaultLayout;

                        if (item.layout) {
                            Layout = item.layout;
                        } else if (item.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={item.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Route>
            </Routes>
            <Modal />
        </BrowserRouter>
    );
}

export default App;
