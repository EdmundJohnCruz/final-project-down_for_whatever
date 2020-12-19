export const setUserName = (userName, userId) => ({
    type: 'USERNAME_SET',
    userName,
    userId,
});

export const setIsLoggedIn = (isLoggedIn) => ( {
    type: 'USER_SET_LOGGED_IN',
    isLoggedIn,
});
export const setAdmin = (admin) => ( {
    type:'ADMIN_SET',
    admin,
})