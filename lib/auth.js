export const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    const authToken = localStorage.getItem('token');
    return !!authToken;
  }
  return false;
};
