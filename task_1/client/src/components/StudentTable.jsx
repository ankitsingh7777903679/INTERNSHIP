import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Select, Label, TextInput } from "flowbite-react";
import { deleteStudent, getStudentOne, getStudents } from '../api/studentService';
import SetStatus from './SetStatus';

function StudentTable({ setStudent, student, setFormData, formData, refresh }) {
    const tableRows = ["Name", "RollNo", "Email", "Phone", "Edit", "Delete", " Status"];
    const [students, setStudents] = useState([])
    const [filter, setFilter] = useState('pending')
    const [searchQuery, setSearchQuery] = useState('')
    console.log('Filter value:', filter);
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
            if (res.status === true) {
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
            if (res.status === true) {
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

    const filteredStudents = students.filter((student) => {
        
        const matchesStatus = filter ==="showAll" || student.status === filter

        const q = searchQuery.toLocaleUpperCase()
        const matchesSearch = 
            (student.name.toLocaleUpperCase().includes(q)) ||
            (student.email.toLocaleUpperCase().includes(q)) ||
            (String(student.phone).toLocaleUpperCase().includes(q)) ||
            (String(student.rollno).toLocaleUpperCase().includes(q)) ;

        return matchesStatus && matchesSearch;

    }
    );
    console.log('Filtered Students:', filteredStudents);

    return (
        <div>
            <div className='flex items-center gap-2 ps-3'>
                <div className="max-w-md">
                    <Label htmlFor="search" value="Search" className="mb-1 block"/>
                    <TextInput 
                        id="search"
                        placeholder="Search " 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {/* filter */}
            <div className="w-25">

                <Select onChange={(e) => { setFilter(e.target.value); loadData(); console.log(filter); }} id="statusFilter" value={filter} required>
                    <option value='pending'>Pending</option>
                    <option value='showAll'>Show All</option>
                    <option value='active'>Active</option>
                    <option value='suspend'>Suspend</option>
                    <option value='delete'>Delete</option>
                </Select>
            </div>
            </div>
            {/* search */}
            

            <div className="overflow-x-auto rounded p-3">
                <Table hoverable>
                    <TableHead>
                        <TableRow>
                            {tableRows.map((row, index) => (
                                <TableHeadCell key={index} className='bg-gray-700 text-white'>{row}</TableHeadCell>
                            ))}
                            {/* <TableHeadCell className='bg-gray-700 text-white'>
                                
                            </TableHeadCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y">
                        {
                            filteredStudents.map((student, index) => {
                                // console.log('Student Status:', student._id);
                                // LOGIC: If status is 'delete'
                                const isDeleted = student.status === 'delete';

                                return (
                                    <TableRow
                                        key={student._id}
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
