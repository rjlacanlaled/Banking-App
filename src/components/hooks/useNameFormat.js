import { useEffect, useState } from 'react';

const format = str => {
    return str.replace(/[^A-Za-z\s]+/, '').replace(/\s\s+/, ' ');
};

const removeExtraChars = (name, maxChars) => {
    return name.slice(0, maxChars);
};

const formatName = (name, maxChars) => {
    console.log('formatting name');
    let formattedName = format(name);
    if (formattedName.length > maxChars) return removeExtraChars(formattedName, maxChars);
    return formattedName;
};

export default function useNameFormat(name, maxChars = 12) {
    const [value, setValue] = useState(() => formatName(name, maxChars));

    useEffect(() => {
        setValue(() => formatName(value, maxChars));
    }, [value]);
    return [value, setValue];
}
