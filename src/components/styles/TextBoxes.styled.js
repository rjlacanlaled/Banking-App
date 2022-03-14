import { useState } from 'react';
import styled from 'styled-components';
import { formatFloat, formatInteger, formatName } from '../../services/InputFormatService';

export function InputText({ value, setValue, maxCharacters, disabled, placeholder }) {
    const handleInputChange = e => {
        if (e.target.value.length > maxCharacters) return;
        setValue(e.target.value);
    };

    return (
        <input
            disabled={disabled}
            type='text'
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder || ''}
        />
    );
}

export function InputName({ value, setValue, maxCharacters, disabled, placeholder }) {
    const handleInputChange = e => {
        if (e.target.value.length > maxCharacters) return;
        setValue(formatName(e.target.value).trim());
    };

    return <input disabled={disabled} type='text' value={value} onChange={handleInputChange} placeholder={placeholder} />;
}

export function InputInteger({ value, setValue, maxDigits, disabled, placeholder }) {
    const handleInputChange = e => {
        setValue(formatInteger(e.target.value));
    };

    return <input disabled={disabled} type='text' value={value} onChange={handleInputChange} placeholder={placeholder} />;
}

export function InputFloat({ value, setValue, maxDigits, disabled, placeholder }) {
    const handleInputChange = e => {
        setValue(formatFloat(e.target.value));
    };

    return <input disabled={disabled} type='text' value={value} onChange={handleInputChange} placeholder={placeholder} />;
}
