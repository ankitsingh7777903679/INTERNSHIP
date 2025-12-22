const msg = {
    student : {
        insert : {
            errors : {
                invalid_param: "Invalid parameters provided",
                email_exists: "Email already exists in active/suspended records!",
                email_invalid_format: "Invalid email format",
            },
            success : "Student inserted successfully"
        },
        update: {
            success: "Student details updated successfully",
            error: "Error updating student details"
        },
        delete: {
            success: "Student moved to recycle bin (Deleted status)",
            error: "Error deleting student"
        },
        status: {
            success: "Student status updated successfully",
            error: "Error updating status"
        },
        list: {
            success: "Student list fetched successfully",
            error: "Error fetching student list"
        }
    },
    academic:{
        stream: {
            error:{
                stream_empty:"Stream name is required",
                stream_exist:"Stream already exists"
            },
            success:"Stream added successfully"
            
        },
        class:{
            success:"Class added successfully"
        },
        subjects:{
            success:"Subject added successfully"
        }
    }
};

module.exports = { msg };