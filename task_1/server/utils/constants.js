const constants = {
    roles: {
        ADMIN: 'admin',
        STUDENT: 'student'
    },
    studentStatus: {
        PENDING: 'pending',
        ACTIVE: 'active',
        SUSPEND: 'suspend', // Ye missing tha, add kar diya
        DELETED: 'delete'
    }
};

const HTTP_RESPONSES = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    DUPLICATE_KEY_ERROR : 11000 // MongoDB Duplicate Error Code
};

module.exports = { constants, HTTP_RESPONSES };