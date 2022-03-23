import { useEffect, useState } from 'react';

const format = str => {
    return str.replace(/[^A-Za-z0-9]+/, '');
};

const removeExtraChars = (str, maxChars) => {
    return str.slice(0, maxChars);
};

const formatAlphaNumeric = (str, maxChars) => {
    let formattedStr = format(str);
    if (formattedStr.length > maxChars) return removeExtraChars(formattedStr, maxChars);
    return formattedStr;
};

export default function useAlphaNumericFormat(str, maxChars = 12) {
    const [value, setValue] = useState(() => formatAlphaNumeric(str, maxChars));

    useEffect(() => {
        setValue(() => formatAlphaNumeric(value, maxChars));
    }, [value]);
    return [value, setValue];
}
