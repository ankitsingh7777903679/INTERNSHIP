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
    }
};

module.exports = { msg };