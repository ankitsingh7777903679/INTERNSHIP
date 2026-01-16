

const msg = {
    dimond : {
        insert : {
            errors : {
                invalid_param: "Invalid parameters provided",
                dimond_exists: "Dimond with this shape/color/clarity/from/to already exists",
            },
            success : "Dimond inserted successfully"
        },
        update : {
            success : "Dimond updated successfully"
        }
        
    },
    addDiamond: {
        success: "Dimond added successfully",
        errors: {
            invalid_param: "Invalid parameters provided for adding dimond",
            skockId_exists: "Dimond with this stockId already exists",
        }
    },
    findDimondPrice:{
        errors: {
            invalid_param: "Invalid parameters provided for finding dimond price",
        },
        notExists: "No dimond exist",
        success: "Dimond price found successfully"
    },
    changeDimondStatus: {
        success: "Dimond status changed successfully",
        errors: {
            invalid_param: "Invalid parameters provided for changing dimond status",
        }
    },
    deleteDimond: {
        success: "Dimond deleted successfully",
        errors: {
            invalid_param: "Invalid parameters provided for deleting dimond",
        }
    },
    updateDimond: {
        success: "Dimond updated successfully",
        errors: {
            invalid_param: "Invalid parameters provided for updating dimond",
            skockId_exists: "Dimond with this stockId already exists",
        }
    },

    user: {
        notFound: "User not found",
        invalidCredentials: "Invalid password",
        signupSuccess: "User registered successfully now you can login",
        noLogin:"Error login",
        getAllUsersError: "Error fetching users",
        updatePermissionsError: "Error updating permissions",
        signupError: "Error during user registration",
        loginSuccess: "Login successful",
        userExists: "User already exists",
        updatePermissionsSuccess: "Permissions updated successfully",
        updateStatusSuccess: "Status updated successfully",
    }
};

module.exports = { msg };