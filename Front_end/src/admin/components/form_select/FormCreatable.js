import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { Controller } from 'react-hook-form';

import { createOption, components } from './constant';

function FormCreateTable({ name, control, placeholder, defaultValue = [] }) {
    const [inputValue, setInputValue] = useState('');
    const [valueSelect, setValueSelect] = useState(
        defaultValue.map((item, index) => createOption(item, index)),
    );

    const handleOnChange = (value, onChange) => {
        setValueSelect(value);
        if (onChange) {
            onChange(value);
        }
    };
    const handleKeyDown = (event, onChange) => {
        if (!inputValue) return;

        switch (event.key) {
            case 'Enter':
            case 'Tab':
                event.preventDefault();

                setValueSelect([
                    ...valueSelect,
                    createOption(inputValue, valueSelect.length),
                ]);
                setInputValue('');

                if (onChange) {
                    onChange([
                        ...valueSelect,
                        createOption(inputValue, valueSelect.length),
                    ]);
                }

                break;
            default:
                break;
        }
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange } }) => (
                <CreatableSelect
                    components={components}
                    inputValue={inputValue}
                    isClearable
                    isMulti
                    menuIsOpen={false}
                    onChange={(newValue) => handleOnChange(newValue, onChange)}
                    onInputChange={(newValue) => setInputValue(newValue)}
                    onKeyDown={(event) => handleKeyDown(event, onChange)}
                    placeholder={placeholder}
                    value={valueSelect}
                />
            )}
        />
    );
}

export default FormCreateTable;
