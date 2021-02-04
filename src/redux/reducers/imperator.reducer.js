// store imperator data for the table
const imperator = (state = [], action) => {
    switch (action.type) {
      case 'SET_IMPERATOR':
        return action.payload;
      default:
        return state;
    }
};
  
export default imperator;