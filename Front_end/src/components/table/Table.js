import classNames from 'classnames/bind';
import { Fragment } from 'react';
import { TailSpin } from 'react-loader-spinner';
import PropTypes from 'prop-types';

const cx = classNames.bind();

function Table({ children, classes, heads, isLoading }) {
    return (
        <table className={cx(classes)}>
            <thead>
                <tr>
                    {heads.map((head, index) => (
                        <th key={index}>{head}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {isLoading ? (
                    <tr>
                        <td colSpan={heads.length}>
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
                        </td>
                    </tr>
                ) : (
                    <Fragment>{children}</Fragment>
                )}
            </tbody>
        </table>
    );
}

Table.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.string,
    heads: PropTypes.array,
    isLoading: PropTypes.bool,
};

export default Table;
