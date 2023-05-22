import { Controller } from 'react-hook-form';
import Select, { components } from 'react-select';
import PropTypes from 'prop-types';
// import { useState } from 'react';

function FormSelect({ name, control, options, label, value, defaultValue }) {
    // const [inputValue, setinputValue] = useState(defaultValue);

    const Option = ({ children, ...props }) => {
        const { data } = props;
        props.value = data[value];

        return (
            <components.Control {...props}>
                {children || data[label]}
            </components.Control>
        );
    };

    // const handleFocus = () => {
    //     setinputValue('');
    // };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange } }) => (
                <Select
                    options={options}
                    components={{
                        Option: Option,
                    }}
                    getOptionLabel={(option) => option[label]}
                    onChange={(option) => onChange(option[value])}
                    // defaultInputValue={defaultValue}
                    defaultValue={defaultValue[label] ? defaultValue : ''}
                    // onFocus={handleFocus}
                    // inputValue={inputValue}
                />
            )}
        />
    );
}

FormSelect.propTypes = {
    name: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    children: PropTypes.node,
    label: PropTypes.string,
    value: PropTypes.string,
};

FormSelect.defaultProps = {
    label: 'label',
    value: 'value',
};

export default FormSelect;
