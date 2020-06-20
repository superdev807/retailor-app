import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

export default function NumberFormatCustom(props) {
    const { inputRef, onChange, name, ...other } = props;
    let prefix = '',
        suffix = '';

    switch (name) {
        case 'floorAreaSize':
            suffix = ' m²';
            break;
        case 'pricePerMonth':
            prefix = '$';
            break;
        default:
            break;
    }

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix={prefix}
            suffix={suffix}
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
