import React from 'react'
import { useState, useEffect } from 'react';
import { changeDimondStatus } from '../api/dimondServer';

function DiamondStatus({ diamondDataStatus, fetchDiamondData, diamondData }) {
    const [statusValue, setStatusValue] = useState(diamondDataStatus);
    // console.log("Diamond Status Value:", diamondDataStatus);
    const statusOptions = [
        { value: 'available', label: 'available' },
        { value: 'hold', label: 'hold' },
        { value: 'sold', label: 'sold' },
        { value: 'deleted', label: 'deleted' }
    ]
    const getStatusStyle = (status) => {
        switch (status) {
            case 'available': return 'text-green-600 border-green-600 bg-green-50';
            case 'hold': return 'text-orange-500 border-orange-500 bg-orange-50';
            case 'sold': return 'text-red-400 border-red-400 bg-red-30';
            case 'deleted': return 'text-red-900 border-red-900 bg-red-50';
            default: return 'text-gray-500 border-gray-500';
        }
    }
    useEffect(() => {
        setStatusValue(diamondDataStatus || 'available');
    }, [diamondDataStatus]);

    const statusChange = async (e) => {
        let newStatus = e.target.value;
        try {
            // await studentSetStatus(student._id, { status: newStatus })
           let res = await changeDimondStatus(diamondData._id, { status: newStatus })
           console.log("Change Diamond Status Response:", res);
            setStatusValue(newStatus);
            fetchDiamondData()
            // loadData(); // Reload table data without full page refresh
        } catch (err) {
            console.error("Error updating status:", err);
        }
    }

    return (
        <div>
            <div>
                <div className="">
                    <select
                        value={statusValue}
                        onChange={statusChange}
                        disabled={statusValue === 'deleted'}
                        className={`font-medium border rounded text-sm 
                            ${    getStatusStyle(statusValue)

                             }`

                        }
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value} className="text-white bg-gray-500">
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default DiamondStatus
