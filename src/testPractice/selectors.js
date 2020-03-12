export const getPoints = state => {
  return state.reduce((acc, next) => {
    switch (next.status) {
      case "Accepted":
        return acc + 1;
      case "Rejected":
        return acc + 10;
      default:
        return acc;
    }
  }, 0);
};
