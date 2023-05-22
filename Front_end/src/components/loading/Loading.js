import { Fragment } from 'react';
import { TailSpin } from 'react-loader-spinner';

function Loading({ isLoading, children }) {
    return (
        <Fragment>
            {isLoading ? (
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
            ) : (
                <Fragment>{children}</Fragment>
            )}
        </Fragment>
    );
}

export default Loading;
