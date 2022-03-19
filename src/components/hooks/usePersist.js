import { useEffect, useState } from 'react';

const fetchSavedValue = (key, value) => {
    const savedValue = JSON.parse(localStorage.getItem(key));
    if (savedValue) return savedValue;

    return value;
};

export default function usePersist(key, initialValue) {
    const [value, setValue] = useState(() => fetchSavedValue(key, initialValue));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
}
