import { Controller } from 'react-hook-form';
import Select, { components } from 'react-select';
import PropTypes from 'prop-types';

function FormSelect({
    name,
    options,
    label,
    value,
    isDisable,
    control,
    placeholder,
}) {
    const Option = ({ children, ...props }) => {
        const { data } = props;
        props.value = data[value];

        return (
            <components.Control {...props}>
                {children || data[label]}
            </components.Control>
        );
    };

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
                    onChange={(option) =>
                        onChange({ value: option[value], label: option[label] })
                    }
                    isDisabled={isDisable}
                    placeholder={placeholder}
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
