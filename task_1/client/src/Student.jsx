import React, { useState } from 'react'
import { Button, Label, TextInput } from "flowbite-react";
import { addStudent, updateStudent } from './api/studentService';
import StudentTable from './components/StudentTable';
import { validateStudentForm } from './validation/studentValidation';


function Student() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [errors, setError] = useState({})
  const [student, setStudent] = useState({})
  const [refresh, setRefresh] = useState(false);

  const getValue = (e) => {
    let inputValue = e.target.value;
    let inputName = e.target.name;
    setFormData({ ...formData, [inputName]: inputValue })

    // Clear error when typing
    if (errors[inputName]) {
      setError({ ...errors, [inputName]: '' })
    }
  }

  const validateForm = (values) => {
    let error = {}
    if (!values.name) error.name = "Name is required";
    if (!values.email) {
      error.email = "Email is required";
    } else if (!/\S+@\S+\.com$/.test(values.email)) {
      error.email = "Email is invalid";
    }
    // if (!values.rollno) error.rollno = "Roll Number is required";
    if (String(values.phone).length !== 10) error.phone = "Phone must be 10 digits";

    return error;
  }

  const formSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateStudentForm(formData)
    if(validationErrors){
      setError(validationErrors)
      return
    }

    // if (Object.keys(formErrors).length === 0) {
      // console.log('Form submitted:', formData);
      // Add your API call here
      let result;
      if (student._id) {
        console.log('Updating student with id:', student._id);
        result = await updateStudent(student._id, formData)
        console.log('Update result:', result);
        if (result.status === true) {
          alert(result.message);
          setFormData({ name: '', email: '', phone: '' })
          setStudent({})
          setRefresh(!refresh)
        }
        else {
          alert(result.err)
        }
      }
      else {
        result = await addStudent(formData)

        if (result.status === true) {
          alert(result.message);
          setFormData({ name: '', email: '', phone: '' })
          setRefresh(!refresh)
        }
        else {
          alert(result.message)
        }
      }


    // }
  }

  return (
    <div className='bg-gray-500 p-4 rounded grid grid-cols-[30%_auto]'>
      <div>
        <h2 className='text-3xl font-bold text-center mb-3 text-white'>Student</h2>
        <form className="flex max-w-md flex-col gap-4" onSubmit={formSubmit}>
          <div>
            <div className="mb-2 block"><Label htmlFor="name" value="Your Name" className='text-white' /></div>
            <TextInput id="name" type="text" name='name' value={formData.name} onChange={getValue} placeholder="Your Name" required />
            {errors.name && <p className='text-red-300 text-sm mt-1'>{errors.name}</p>}
          </div>
          {/* <div>
            <div className="mb-2 block"><Label htmlFor="rollno" value="Roll Number" className='text-white' /></div>
            <TextInput id="rollno" name='rollno' value={formData.rollno} onChange={getValue} type="number" placeholder="Roll Number" required />
            {errors.rollno && <p className='text-red-300 text-sm mt-1'>{errors.rollno}</p>}
          </div> */}
          <div>
            <div className="mb-2 block"><Label htmlFor="email" value="Email" className='text-white' /></div>
            <TextInput id="email" name='email' value={formData.email} onChange={getValue} type="email" placeholder="name@company.com" required />
            {errors.email && <p className='text-red-300 text-sm mt-1'>{errors.email}</p>}
          </div>
          <div>
            <div className="mb-2 block"><Label htmlFor="phone" value="Phone" className='text-white' /></div>
            <TextInput id="phone" name='phone' value={formData.phone} onChange={getValue} type="number" placeholder="Phone" required />
            {errors.phone && <p className='text-red-300 text-sm mt-1'>{errors.phone}</p>}
          </div>

          <Button type="submit" className="bg-blue-600 w-full">
            {student._id ? 'Update' : 'Submit'}
          </Button>
        </form>
      </div>

      <div>
        <h2 className='text-3xl font-bold text-center mb-3 text-white'>Student List</h2>

        <StudentTable setStudent={setStudent} student={student} setFormData={setFormData} formData={formData} refresh={refresh} />
      </div>

    </div>
  )
}

export default Student
