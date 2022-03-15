export const formatName = name => {
    return name.replace(/[^A-Za-z\s]+/, '').replace(/\s\s+/, ' ');
};

export const formatInteger = number => {
    return number.replace(/[a-zA-Z\W]+/, '');
}

export const formatFloat = number => {
    return number.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '0.0');
}
