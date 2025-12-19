import React, { useEffect, useState } from 'react'
import { studentSetStatus } from '../api/studentService';

function SetStatus({studentStatus, student, loadData}) {
    const [statusValue, setStatusValue] = useState(studentStatus || 'pending');

    useEffect(() => {
        setStatusValue(studentStatus || 'pending');
    }, [studentStatus]);

    const statusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'active', label: 'Active' },
        { value: 'suspend', label: 'Suspend' },
        { value: 'delete', label: 'Delete' }
    ]

    const getStatusStyle = (status) => {
        switch (status) {
            case 'active': return 'text-green-600 border-green-600 bg-green-50';
            case 'suspend': return 'text-orange-500 border-orange-500 bg-orange-50';
            case 'delete': return 'text-red-600 border-red-600 bg-red-50';
            case 'pending': return 'text-blue-500 border-blue-500 bg-blue-50';
            default: return 'text-gray-500 border-gray-500';
        }
    }

    const statusChange = async (e) => {
        let newStatus = e.target.value;
        try {
            await studentSetStatus(student._id, { status: newStatus})
            setStatusValue(newStatus);
            loadData(); // Reload table data without full page refresh
        } catch (err) {
            console.error("Error updating status:", err);
        }
    }
    return (
        <div>
            <div className="max-w-md">
            <select 
                value={statusValue}
                onChange={statusChange}
                disabled={student.status === 'delete'}
                className={`font-medium border rounded text-sm p-1 ${getStatusStyle(statusValue)}`}
            >
                {statusOptions.map((option) => (
                    <option key={option.value} value={option.value} className="text-black bg-white">
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
        </div>
    )
}

export default SetStatus
