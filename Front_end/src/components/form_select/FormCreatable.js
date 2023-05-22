import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { Controller } from 'react-hook-form';

import { createOption, components } from './constant';

function FormCreateTable({ name, control, placeholder }) {
    const [inputValue, setInputValue] = useState('');
    const [valueSelect, setValueSelect] = useState([]);

    const handleKeyDown = (event, onChange) => {
        if (!inputValue) return;

        switch (event.key) {
            case 'Enter':
            case 'Tab':
                event.preventDefault();

                setValueSelect([...valueSelect, createOption(inputValue)]);
                setInputValue('');

                if (onChange) {
                    onChange([...valueSelect, createOption(inputValue)]);
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
            render={({ field: { onChange, value } }) => (
                <CreatableSelect
                    components={components}
                    inputValue={inputValue}
                    isClearable
                    isMulti
                    menuIsOpen={false}
                    onInputChange={(newValue) => setInputValue(newValue)}
                    onKeyDown={(event) => handleKeyDown(event, onChange)}
                    placeholder={placeholder}
                    value={value}
                />
            )}
        />
    );
}

export default FormCreateTable;
