import React, { useEffect, useState } from 'react'
import { Button, Label, TextInput, Select } from "flowbite-react";
import { addStudent, updateStudent } from './api/studentService';
import StudentTable from './components/StudentTable';
import { validateStudentForm } from './validation/studentValidation';
import { getClasses, getStreams, getSubjects } from './api/acadmicService';


function Student() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', stream: '', class: '', subject: [] })
  const [errors, setError] = useState({})
  const [student, setStudent] = useState({})
  const [refresh, setRefresh] = useState(false);
  const [availableStreams, setAvailableStreams] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);

  const getAllStreams = async () => {
    try {
      const res = await getStreams();
      // console.log("Streams fetched:", res);
      setAvailableStreams(res.data);
    } catch (err) {
      console.error("Error fetching streams:", err);
    }
  }
  // console.log("Available Streams:", availableStreams);
  const getAllClasses = async () => {
    try {
      const res = await getClasses();
      // console.log("Classes fetched:", res);
      setAvailableClasses(res.data);
    } catch (err) {
      console.error("Error fetching classes:", err);
    }
  }
  const getAllSubjects = async () => {
    try {
      const res = await getSubjects();
      // console.log("Subjects fetched:", res);
      setAvailableSubjects(res.data);
    } catch (er) {
      console.error("Error fetching subjects:", er);
    }
  }
  const getValue = (e) => {
    const inputValue = e.target.value;
    const inputName = e.target.name;

    setFormData((prev) => {
      // When stream changes, reset dependent fields so old subjects don't remain
      if (inputName === 'stream') {
        return { ...prev, stream: inputValue, class: '', subject: [] };
      }

      // When class changes, reset subjects
      if (inputName === 'class') {
        return { ...prev, class: inputValue, subject: [] };
      }

      return { ...prev, [inputName]: inputValue };
    })

    // Clear errors (and dependent errors when stream changes)
    if (inputName === 'stream') {
      setError((prev) => ({ ...prev, stream: '', class: '', subject: '' }))
      return;
    }
    if (inputName === 'class') {
      setError((prev) => ({ ...prev, class: '', subject: '' }))
      return;
    }
    if (errors[inputName]) {
      setError((prev) => ({ ...prev, [inputName]: '' }))
    }
  }

  const handleSubjectChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      if (!Array.isArray(prev.subject)) return { ...prev, subject: checked ? [value] : [] };
      if (checked) return { ...prev, subject: [...prev.subject, value] };
      return { ...prev, subject: prev.subject.filter((sub) => sub !== value) };
    })
    // Clear error when selecting
    if (errors.subject) {
      setError((prev) => ({ ...prev, subject: '' }))
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
    if (validationErrors) {
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
      console.log('Update result:', result.message);
      if (result.status === true) {
        alert(result.message);
        setFormData({ name: '', email: '', phone: '', stream: '', class: '', subject: [] })
        setStudent({})
        setRefresh(!refresh)
      }
      else {
        alert(result.message)
      }
    }

    else {
      result = await addStudent(formData)
      if (result.status === true) {
        alert(result.message);

        setFormData({ name: '', email: '', phone: '', stream: '', class: '', subject: [] })
        setRefresh(!refresh)
      }
      else {
       return alert(result.message)
      }
    }
  }

  useEffect(() => {
    getAllStreams();
    getAllClasses();
    getAllSubjects();
  }, [])

  return (

  <div className='bg-gray-500 p-4 rounded w-full max-w-full overflow-x-hidden grid grid-cols-1 lg:grid-cols-[20%_minmax(0,1fr)] gap-4'>
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
          {/* stream */}
          <div>
            <div className="mb-2 block"><Label htmlFor="stream" value="Stream" className='text-white' /></div>
            <Label htmlFor="stream"> Stream</Label>
            <Select
              value={formData.stream} onChange={getValue} name='stream' id="stream" required
            >
              <option value="">-- Select --</option>
              {availableStreams.map(stream => (
                <option key={stream._id} value={stream.name}>{stream.name}</option>
              ))}
            </Select>
            {errors.stream && <p className='text-red-300 text-sm mt-1'>{errors.stream}</p>}
          </div>
          {/* class */}
          <div>
            <div className="mb-2 block"><Label htmlFor="class" value="Class" className='text-white' /></div>
            <Label htmlFor="class"> Class</Label>
            <Select
              value={formData.class} onChange={getValue} name='class' id="class" required
            >
              <option value="">-- Select --</option>
              {
                availableClasses.filter(classItem => classItem.stream === formData.stream).map(classItem => (
                  <option key={classItem._id} value={classItem.name}>{classItem.name}</option>
                ))
              }
              
            </Select>
            {errors.class && <p className='text-red-300 text-sm mt-1'>{errors.class}</p>}
          </div>
          {/* subject */}
          <div>
            <div className="mb-2 block"><Label value="Subjects (Select multiple)" className='text-white' /></div>
            <div className="flex flex-col gap-2 p-3 bg-[#374151] rounded-lg">
              {
                availableSubjects.filter(subject => subject.stream === formData.stream).map(subject => (
                  <label key={subject._id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      value={subject.name}
                      checked={formData.subject.includes(subject.name)}
                      onChange={handleSubjectChange}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="text-white ">{subject.name}</span>
                  </label>
                ))
              }
            </div>
            {errors.subject && <p className='text-red-300 text-sm mt-1'>{errors.subject}</p>}
          </div>

          <Button type="submit" className="bg-blue-600 w-full">
            {student._id ? 'Update' : 'Submit'}
          </Button>
        </form>
      </div>
      <div className='min-w-0'>
        <h2 className='text-3xl font-bold text-center mb-3 text-white'>Student List</h2>
        <StudentTable setStudent={setStudent} student={student} setFormData={setFormData} formData={formData} refresh={refresh} availableClasses={availableClasses} availableSubjects={availableSubjects} />
      </div>

    </div>
  )
}

export default Student
