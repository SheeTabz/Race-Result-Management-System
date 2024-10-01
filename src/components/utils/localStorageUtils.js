export const saveRacesToLocalStorage = (races) => {
    localStorage.setItem('races', JSON.stringify(races));
};

export const getRacesFromLocalStorage = () => {
    const races = localStorage.getItem('races');
    return races ? JSON.parse(races) : [];
};
