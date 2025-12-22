import { Button, Label, Select, TextInput, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { addClass, addStream, addSubject, getClasses, getStreams, getSubjects } from '../api/acadmicService'
function ManageAcademic() {
    const [streamName, setStreamName] = useState('');
    const [availableStreams, setAvailableStreams] = useState([]);
    const [classData, setClassData] = useState({ name: '', stream: '' });
    const [availableClasses, setAvailableClasses] = useState([]);
    const [subjectData, setSubjectData] = useState({ name: '', stream: '' });
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
    const getAllClasses = async () => {
        try {
            const res = await getClasses();
            console.log("Classes fetched:", res);
            setAvailableClasses(res.data);
        } catch (err) {
            console.error("Error fetching classes:", err);
        }
    }
    const getAllSubjects = async () => {
        try {
            const res = await getSubjects();
            console.log("Subjects fetched:", res);
            setAvailableSubjects(res.data);
        } catch (er) {
            console.error("Error fetching subjects:", er);
        }
    }
    useEffect(() => {
        getAllStreams();
        getAllClasses();
        getAllSubjects();
    }, []);
    // console.log("Streams fetched:", availableStreams);

    const handleAddStream = async (e) => {
        e.preventDefault();
        try {
            const res = await addStream({ name: streamName });
            console.log("Add Stream response:", res);
            if (res.status === true) {
                alert(`Stream "${streamName}" added!`);
                setStreamName('');
                getAllStreams();
                return;
            }
            alert(`Failed to add stream: ${res.message}`);
        } catch (err) {
            alert("Error adding stream:", err.message);
            return;
        }
    }

    const handleAddClass = async (e) => {
        e.preventDefault();
        console.log("Class Data to be added:", classData);
        const res = await addClass(classData)
        try {
            if (res.status === true) {
                alert(`Class "${classData.name}" added!`);
                getAllClasses();
                setClassData({ name: '', stream: '' });
                return;
            }
            alert(`Failed to add class: ${res.message}`);
        } catch (err) {
            alert("Error adding class:", err.message);
            return;
        }

    }

    const handleAddSubject = async (e) => {
        e.preventDefault();
        console.log("Class Data to be added:", subjectData);
        const res = await addSubject(subjectData)
        try {
            if (res.status === true) {
                alert(`Class "${subjectData.name}" added!`);
                getAllSubjects();
                setSubjectData({ name: '', stream: '' });
                return;
            }
            alert(`Failed to add class: ${res.message}`);
        } catch (err) {
            alert("Error adding class:", err.message);
            return;
        }
        
    }

    return (
        <>
            <div className="p-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

                {/* --- FORM 1: CREATE STREAM --- */}
                <Card className="border-t-4 border-green-500">
                    <h3 className="text-xl font-bold">1. Create Stream</h3>
                    <form onSubmit={handleAddStream} className="flex flex-col gap-4">
                        <div>
                            <Label value="Stream Name (e.g. Science, Arts)" />
                            <TextInput
                                value={streamName}
                                onChange={(e) => setStreamName(e.target.value)}
                                placeholder="Enter new stream..."
                                required
                            />
                        </div>
                        <Button className="bg-black" type="submit" color="success">Add Stream</Button>
                    </form>
                    {/* Show existing streams */}
                    <div className="mt-2 text-sm text-gray-500">
                        Existing: {availableStreams.map(s => s.name).join(', ')}

                    </div>
                </Card>

                {/* --- FORM 2: CREATE CLASS --- */}
                <Card className="border-t-4 border-blue-500">
                    <h3 className="text-xl font-bold">2. Add Class</h3>
                    <form onSubmit={handleAddClass} className="flex flex-col gap-4">
                        <div>
                            <Label value="Class Name" />
                            <TextInput
                                value={classData.name}
                                placeholder="Class Name"
                                // onChange={(e) => setClassData({ ...classData, name: e.target.value })}
                                onChange={(e) => setClassData({ ...classData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <Label value="Select Stream" />
                            <Select
                                value={classData.stream}
                                // onChange={(e) => setClassData({ ...classData, stream: e.target.value })}
                                onChange={(e) => setClassData({ ...classData, stream: e.target.value })}
                                required
                            >
                                <option value="">-- Select --</option>
                                {availableStreams.map(stream => (
                                    <option key={stream._id} value={stream.name}>{stream.name}</option>
                                ))}
                            </Select>
                        </div>
                        <Button type="submit" color="blue">Save Class</Button>
                        <div className="mt-2 text-sm text-gray-500 grid grid-cols-3">
                            <div>
                                <p className="text-[16px] text-white">Comm</p>
                                {
                                    availableClasses.map(s => {
                                        if (s.stream == 'comm') {
                                            return <p>{s.name}</p>
                                        }
                                    }
                                    )
                                }
                            </div>
                            <div>
                                <p className="text-[16px] text-white">Sci</p>
                                {
                                    availableClasses.map(c => {
                                        if (c.stream == 'sci') {
                                            return <p>{c.name}</p>
                                        }
                                    }
                                    )
                                }
                            </div>
                            <div>
                                <p className="text-[16px] text-white">Arts</p>
                                {
                                    availableClasses.map(c => {

                                        if (c.stream == 'arts') {
                                            return <p>{c.name}</p>
                                        }
                                    }
                                    )
                                }
                            </div>


                        </div>
                    </form>
                </Card>

                {/* --- FORM 3: CREATE SUBJECT --- */}
                 <Card className="border-t-4 border-purple-500">
                <h3 className="text-xl font-bold">3. Add Subject</h3>
                <form onSubmit={handleAddSubject} className="flex flex-col gap-4">
                    <div>
                        <Label value="Subject Name" />
                        <TextInput 
                            placeholder="Subject Name"
                            value={subjectData.name} 
                            onChange={(e) => setSubjectData({...subjectData, name: e.target.value})} 
                            required 
                        />
                    </div>
                    <div>
                        <Label value="Select Stream" />
                        <Select 
                            value={subjectData.stream} 
                            onChange={(e) => setSubjectData({...subjectData, stream: e.target.value})}
                            required
                        >
                            <option value="">-- Select --</option>
                            {availableStreams.map(stream => (
                                <option key={stream._id} value={stream.name}>{stream.name}</option>
                            ))}
                        </Select>
                    </div>
                    <Button type="submit" color="purple">Save Subject</Button>
                     <div className="mt-2 text-sm text-gray-500 grid grid-cols-3">
                            <div>
                                <p className="text-[16px] text-white">Comm</p>
                                {
                                    availableSubjects.map(s => {
                                        if (s.stream == 'comm') {
                                            return <p>{s.name}</p>
                                        }
                                    }
                                    )
                                }
                            </div>
                            <div>
                                <p className="text-[16px] text-white">Sci</p>
                                {
                                    availableSubjects.map(c => {
                                        if (c.stream == 'sci') {
                                            return <p>{c.name}</p>
                                        }
                                    }
                                    )
                                }
                            </div>
                            <div>
                                <p className="text-[16px] text-white">Arts</p>
                                {
                                    availableSubjects.map(c => {

                                        if (c.stream == 'arts') {
                                            return <p>{c.name}</p>
                                        }
                                    }
                                    )
                                }
                            </div>


                        </div>
                </form>
            </Card> 

            </div>

        </>
    )
}

export default ManageAcademic
