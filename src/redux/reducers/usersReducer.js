const initialState = {
    isLoading: true,
    allUsersList:[]
};

const usersReducers = ( state = initialState, action) => {
    switch(action.type){
        case "USERSLIST" : return { allUsersList:action.payload, isLoading:false};
        default: return state;
    };
};

export default usersReducers;