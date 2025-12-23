import React, { use, useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Select, Label, TextInput, Pagination } from "flowbite-react";
import { deleteStudent, getStudentOne, getStudents } from '../api/studentService';
import SetStatus from './SetStatus';

function StudentTable({ setStudent, student, setFormData, formData, refresh, availableClasses, availableSubjects }) {
    const tableRows = ["Name", "RollNo", "Email", "Phone", "stream", "Class", "Subject", "Edit", "Delete", " Status"];
    const [students, setStudents] = useState([])

    // pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5);

    // filter states
    const [filter, setFilter] = useState('showAll')
    const [searchQuery, setSearchQuery] = useState('')
    const [stream, setStream] = useState('ShowAll')
    const [classes, setClasses] = useState('ShowAll')
    const [subjects, setSubjects] = useState('ShowAll')

    // console.log('class value:', availableClasses);

    const unocClass = availableClasses.map(classItem => classItem.name);
    const unocSub = availableSubjects.map(subjectItem => subjectItem.name);
    //not same name print
    const uniqueClassNames = [...new Set(unocClass)];
    const uniqueSubNames = [...new Set(unocSub)];
    // console.log('Unique sub Names:', uniqueSubNames);



    const loadData = async () => {
        // try {
        //     const res = await getStudents();
        //     if (res.status === true) {
        //         setStudents(res.data)
        //     }
        // } catch (err) {
        //     console.log("Error fetching students:", err);
        // }

        try {
            const res = await getStudents({
                page: currentPage,
                limit: 5,
                search: searchQuery,
                status: filter,
                stream: stream,
                class: classes,
                subject: subjects
            });

            if (res.status === true) {
                setStudents(res.data);
                if (res.pagination) {
                    setTotalPages(res.pagination.totalPages);
                }
            }
        } catch (err) {
            console.log("Error fetching students:", err);
        }
    }


    // Effect 1: Reload when Page or Refresh changes
    useEffect(() => {
        loadData();
    }, [refresh, currentPage])

    // Effect 2: Reset to Page 1 when Filters/Search change
    useEffect(() => {
        setCurrentPage(1);
        loadData();
    }, [filter, stream, classes, subjects, searchQuery]);

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
                const subjectArray = Array.isArray(res.data.subject)
                    ? res.data.subject
                    : (res.data.subject ? [res.data.subject] : []);
                // Only set the fields needed for the form
                setFormData({
                    name: res.data.name,
                    email: res.data.email,
                    phone: String(res.data.phone),
                    // rollno: String(res.data.rollno),
                    stream: res.data.stream,
                    class: res.data.class,
                    subject: subjectArray
                });
                // });
            }
        } catch (err) {
            console.log("Error deleting student:", err);
        }
    }

    // const filteredStudents = students.filter((student) => {
    //     const matchesStatus = filter === "showAll" || student.status === filter;
    //     const matchesStream = stream === "ShowAll" || student.stream === stream;
    //     const matchesClass = classes === "ShowAll" || student.class === classes;
    //     const matchesSubject = subjects === "ShowAll" || (Array.isArray(student.subject) ? student.subject.includes(subjects) : student.subject === subjects);
    //     const q = searchQuery.toLocaleUpperCase();
    //     const matchesSearch = !q || 
    //         (student.name.toLocaleUpperCase().includes(q)) ||
    //         (student.email.toLocaleUpperCase().includes(q)) ||
    //         (String(student.phone).toLocaleUpperCase().includes(q)) ||
    //         (String(student.rollno).toLocaleUpperCase().includes(q)) ||
    //         (student.stream.toLocaleUpperCase().includes(q)) ||
    //         (student.class.toLocaleUpperCase().includes(q)) ||
    //         (Array.isArray(student.subject) && student.subject.some(sub => sub.toLocaleUpperCase().includes(q))) ||
    //         (typeof student.subject === 'string' && student.subject.toLocaleUpperCase().includes(q));

    //     return matchesStatus && matchesStream && matchesSearch && matchesClass && matchesSubject;
    // });
    // console.log('Filtered Students:', filteredStudents);

    return (
        <div>
            <div className='flex items-center gap-2 ps-3'>
                <div className="max-w-md">
                    <Label htmlFor="search" value="Search" className="mb-1 block ms-1" >search</Label>
                    <TextInput
                        id="search"
                        placeholder="Search "
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {/* filter */}
                <div className="w-25">
                    <Label htmlFor="status" value="Status" className="mb-1 block ms-1" >status</Label>
                    <Select onChange={(e) => { setFilter(e.target.value); loadData(); console.log(filter); }} id="statusFilter" value={filter} required>
                        <option value='showAll'>Show All</option>
                        <option value='pending'>Pending</option>
                        <option value='active'>Active</option>
                        <option value='suspend'>Suspend</option>
                        <option value='delete'>Delete</option>

                    </Select>
                </div>
                <div className="w-25">
                    <Label htmlFor="stream" value="Stream" className="mb-1 block ms-1" >stream</Label>
                    <Select onChange={(e) => { setStream(e.target.value); loadData(); console.log(stream); }} id="streamFilter" value={stream} required>
                        <option value='ShowAll'>Show All</option>
                        <option value='comm'>comm</option>
                        <option value='arts'>Arts</option>
                        <option value='sci'>sci</option>

                    </Select>
                </div>
                <div className="w-25">
                    <Label htmlFor="class" value="class" className="mb-1 block ms-1" >class</Label>
                    <Select onChange={(e) => { setClasses(e.target.value); loadData(); console.log(classes); }} id="classFilter" value={classes} required>
                        <option value='ShowAll'>Show All</option>
                        {
                            uniqueClassNames.map((classItem, i) => (
                                <option className='text-white' key={i} value={classItem}>{classItem}</option>
                            ))
                        }


                    </Select>
                </div>
                <div className="w-25">
                    <Label htmlFor="class" value="class" className="mb-1 block ms-1" >subjects</Label>
                    <Select onChange={(e) => { setSubjects(e.target.value); loadData(); console.log(subjects); }} id="classFilter" value={subjects} required>
                        <option value='ShowAll'>Show All</option>
                        {
                            uniqueSubNames.map((classItem, i) => (
                                <option className='text-white' key={i} value={classItem}>{classItem}</option>
                            ))
                        }


                    </Select>
                </div>


            </div>
            {/* search */}

            <div className="w-full max-w-full overflow-x-auto rounded p-3">
                <Table hoverable className="min-w-max">
                    <TableHead >
                        <TableRow>
                            {tableRows.map((row, index) => (
                                <TableHeadCell key={index} className='bg-gray-700 text-white whitespace-nowrap'>{row}</TableHeadCell>
                            ))}
                            {/* <TableHeadCell className='bg-gray-700 text-white'>
                                
                            </TableHeadCell> */}
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
                                        key={student._id}
                                        className={`bg-white dark:border-gray-700 dark:bg-gray-800 
                        ${isDeleted ? 'bg-gray-300 opacity-60' : ''}`} // Gray out if deleted
                                    >
                                        <TableCell className="font-medium text-white whitespace-nowrap">{student.name}</TableCell>
                                        <TableCell className="whitespace-nowrap">{student.rollno}</TableCell>
                                        {/* Strike through email if deleted */}
                                        <TableCell className={`whitespace-nowrap ${isDeleted ? 'line-through text-red-700' : ''}`}>
                                            {student.email}
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap">{student.phone}</TableCell>
                                        <TableCell className="whitespace-nowrap">{student.stream}</TableCell>
                                        <TableCell className="whitespace-nowrap">{student.class}</TableCell>
                                        <TableCell className="whitespace-nowrap max-w-xs">
                                            <div
                                                className="truncate"
                                                title={Array.isArray(student.subject) ? student.subject.join(', ') : student.subject}
                                            >
                                                {Array.isArray(student.subject) ? student.subject.join(', ') : (student.subject || '-')}
                                            </div>
                                        </TableCell>
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

                {/* --- PAGINATION --- */}
                <div className="flex justify-center mt-4">
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => setCurrentPage(page)}
                            showIcons
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default StudentTable
