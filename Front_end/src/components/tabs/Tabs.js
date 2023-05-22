import classNames from 'classnames/bind';

import Button from '../button/Button';

import styles from './Tabs.module.scss';

const cx = classNames.bind(styles);

function Tabs({ tabs, tab, onClick }) {
    return (
        <div className={cx('tabs')}>
            <ul className={cx('row', 'row--nowrap')}>
                {tabs.map((item, index) => (
                    <li
                        key={index}
                        className={cx('col', 'l-2', 'm-3', 's-6', 'tab')}
                    >
                        <Button
                            className={cx('tab__button', {
                                'tab__button--active':
                                    item.content === tab.content,
                            })}
                            text
                            fullWidth
                            onClick={() => onClick(item)}
                        >
                            {item.content}
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Tabs;
