export const displayModalForDuration = (displayToggle, duration) => {
    displayToggle(true);
    setTimeout(() => {
        displayToggle(false);
    }, duration);
};
