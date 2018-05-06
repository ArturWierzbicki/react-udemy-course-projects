const filtersDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
};

export default (state = filtersDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.filter
            };
        case 'SET_SORT_BY':
            return {
                ...state,
                sortBy: action.field
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate,
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate,
            };
        default:
            return state;
    }
};