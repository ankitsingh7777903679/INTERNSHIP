import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { deleteStudent, getStudentOne, getStudents } from '../api/studentService';
import SetStatus from './SetStatus';

function StudentTable({setStudent, student, setFormData, formData, refresh}) {
    const tableRows = ["Name", "RollNo", "Email", "Phone", "Edit", "Delete", "Status"];
    const [students, setStudents] = useState([])



    const loadData = async () => {
        try {
            const res = await getStudents();
            if (res.status === true) {
                setStudents(res.data)
            }
        } catch (err) {
            console.log("Error fetching students:", err);
        }
    }

    useEffect(() => {
        loadData();
    }, [refresh])

    const studentDelete = async (id) => {
        try {
            console.log('Deleting student with id:', id);
            const res = await deleteStudent(id)
            if( res.status === true){
                alert(res.message);
                loadData();
            }
        } catch (err) {
            console.log("Error deleting student:", err);
        }
    }

    const editStudent = async (id) => {
        try {
             console.log('select one student with id:', id);
            const res = await getStudentOne(id)
            if( res.status === true){
                setStudent(res.data);
                // Only set the fields needed for the form
                setFormData({
                    name: res.data.name,
                    email: res.data.email,
                    phone: String(res.data.phone)
                });
                // });
            }
        } catch (err) {
            console.log("Error deleting student:", err);
        }
    }

    return (
        <div>
            <div className="overflow-x-auto rounded p-3">
                <Table hoverable>
                    <TableHead>
                        <TableRow>
                            {tableRows.map((row, index) => (
                                <TableHeadCell key={index} className='bg-gray-700 text-white'>{row}</TableHeadCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y">
                        {
                            students.map((student, index) => {
                                // console.log('Student Status:', student._id);
                                // LOGIC: If status is 'delete'
                                const isDeleted = student.status === 'delete';

                                return (
                                    <TableRow
                                        key={index}
                                        className={`bg-white dark:border-gray-700 dark:bg-gray-800 
                        ${isDeleted ? 'bg-gray-300 opacity-60' : ''}`} // Gray out if deleted
                                    >
                                        <TableCell className="font-medium text-white">{student.name}</TableCell>
                                        <TableCell>{student.rollno}</TableCell>
                                        {/* Strike through email if deleted */}
                                        <TableCell className={isDeleted ? 'line-through text-red-700' : ''}>
                                            {student.email}
                                        </TableCell>
                                        <TableCell>{student.phone}</TableCell>

                                        {/* EDIT BUTTON */}
                                        <TableCell>
                                            <button
                                                onClick={() => !isDeleted && editStudent(student._id)}
                                                className={`font-medium ${isDeleted ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:underline'}`}
                                                disabled={isDeleted}
                                            >
                                                Edit
                                            </button>
                                        </TableCell>

                                        {/* DELETE BUTTON */}
                                        <TableCell>
                                            <button
                                                onClick={() => { if (!isDeleted) { studentDelete(student._id); } }}
                                                
                                                className={`font-medium ${isDeleted ? 'text-gray-400 cursor-not-allowed' : 'text-red-600 hover:underline'}`}
                                                disabled={isDeleted}
                                            >
                                                {isDeleted ? 'Deleted' : 'Delete'}
                                            </button>
                                        </TableCell>

                                        {/* STATUS DROPDOWN */}
                                        <TableCell>
                                            <SetStatus
                                                studentStatus={student.status} student={student} refresh={refresh} loadData={loadData}
                                            />
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default StudentTable
