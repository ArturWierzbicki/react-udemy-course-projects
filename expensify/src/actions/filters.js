export const setTextFilter = (filter) => ({
    type: 'SET_TEXT_FILTER',
    filter,
});

export const sortByDate = () => sortBy('date');
export const sortByAmount = () => sortBy('amount');

const sortBy = (field) => ({
    type: 'SET_SORT_BY',
    field
});

export const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

export const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});