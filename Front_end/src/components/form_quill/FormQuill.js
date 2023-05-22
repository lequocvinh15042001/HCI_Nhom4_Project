import { Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';

function FormQuill({ name, control, theme, modules, formats }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <ReactQuill
                    theme={theme}
                    value={value}
                    onChange={(value) => {
                        onChange(value === '<p><br></p>' ? '' : value);
                    }}
                    formats={formats}
                    modules={modules}
                />
            )}
        />
    );
}

FormQuill.propTypes = {
    name: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    theme: PropTypes.string,
    modules: PropTypes.object,
    formats: PropTypes.array,
};

FormQuill.defaultProps = {
    theme: 'snow',
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ],
    },
    formats: ['header', 'bold', 'italic', 'underline', 'strike'],
};

export default FormQuill;
