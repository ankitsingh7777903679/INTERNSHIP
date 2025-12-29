
import { Button, Checkbox, Label, TextInput, Select } from "flowbite-react";
import { useState } from "react";
import { insertStoneGroup, updateDimond } from "./api/dimondServer";
import StoneGroupTable from "./components/StoneGroupTable";
import { validationDimondForm, validationDimondField } from "./validation/dimondValidation";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
// import { set } from "mongoose";
function Dimond() {
    const [error, setError] = useState({})
    const [dimondId, setDimondId] = useState(null);
    const [dimondValue, setDimondValue] = useState({
        shape: "",
        color: "",
        clarity: "",
        from: "",
        to: "",
        price: ""
    });
    const setFormDimondValue = (e) => {
        const { id, value } = e.target;
        const updatedValue = { ...dimondValue, [id]: value };
        setDimondValue(updatedValue);

        // Validate only the changed field
        const fieldError = validationDimondField(id, value);
        setError(prev => ({
            ...prev,
            [id]: fieldError
        }));
    }

    const cancleEdite = () => {
        setDimondValue({
            shape: "",
            color: "",
            clarity: "",
            from: "",
            to: "",
            price: ""

        });
        setDimondId(null);
    }

    const handelFormDimond = async (e) => {
        e.preventDefault();
        // alert("Dimond Value Submitted");
        console.log("Dimond Value Submitted:", dimondValue);
        const errors = validationDimondForm(dimondValue);
        if (errors) {
            setError(errors)
            
            console.log("Validation errors:", error)
            toast.error(error.shape || error.color || error.clarity || error.from || error.to || error.price);
            // alert("Validation errors. Please check the form fields.");
            return;
        }

        if (dimondId) {
            let id = dimondId;
            let res = await updateDimond(id, dimondValue);
            console.log("Response from server:", res);
            if (res.status === true) {
                toast.success(res.message);
                // alert(res.message);
                setDimondValue({
                    shape: "",
                    color: "",
                    clarity: "",
                    from: "",
                    to: "",
                    price: ""

                });
                setDimondId(null);
            }
            else {
                toast.error(res.message || "Failed to insert dimond data.");
                // alert(res.message || "Failed to insert dimond data.");
            }

        }
        else {
            let res = await insertStoneGroup(dimondValue);
            console.log("Response from server:", res);
            if (res.status === true) {
                toast.success(res.message);
                // alert(res.message);
                setDimondValue({
                    shape: "",
                    color: "",
                    clarity: "",
                    from: "",
                    to: "",
                    price: ""

                });
            }
            else {
                toast.error(res.message || "Failed to insert Stone Group data.")
                // alert(res.message || "Failed to insert Stone Group data.");
            }
        }


    }


    return (
        <>
            <div className="p-4 grid grid-cols-[30%_auto] gap-7">
                <div className="">
                    <h1 className="text-2xl font-bold mb-4">Stone Group</h1>
                    <ToastContainer />
                    <form onSubmit={handelFormDimond} className="flex w-full flex-col gap-4 bg-gray-500 p-4 rounded-lg">

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="shape">Shape</Label>
                            </div>
                            <Select id="shape" value={dimondValue.shape} onChange={(e) => setFormDimondValue(e)} >
                                <option value="">Select shape</option>
                                <option value="round">Round</option>
                                <option value="pear">Pear</option>
                                <option value="heart">Heart</option>
                            </Select>
                            {error.shape && <p className='text-red-300 text-sm mt-1'>{error.shape}</p>}
                        </div>
                        <div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="color">Color</Label>
                                </div>
                                <Select id="color" value={dimondValue.color} onChange={(e) => setFormDimondValue(e)} >
                                    <option value="">Select color</option>
                                    <option value="G">G</option>
                                    <option value="H">H</option>
                                    <option value="I">I</option>
                                    <option value="J">J</option>
                                </Select>
                                {error.color && <p className='text-red-300 text-sm mt-1'>{error.color}</p>}
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="clarity">Clarity</Label>
                                </div>
                                <Select id="clarity" value={dimondValue.clarity} onChange={(e) => setFormDimondValue(e)} >
                                    <option value="">Select clarity</option>
                                    <option value="SI1">SI1</option>
                                    <option value="VS1">VS1</option>
                                    <option value="VVS1">VVS1</option>
                                    <option value="VVS2">VVS2</option>
                                </Select>
                                {error.clarity && <p className='text-red-300 text-sm mt-1'>{error.clarity}</p>}
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="from">From</Label>
                                </div>
                                <TextInput id="from" type="number" value={dimondValue.from} onChange={(e) => setFormDimondValue(e)} placeholder="Enter 0.19.." />
                                {error.from && <p className='text-red-300 text-sm mt-1'>{error.from}</p>}
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="to">To</Label>
                                </div>
                                <TextInput id="to" type="number" value={dimondValue.to} onChange={(e) => setFormDimondValue(e)} placeholder="enter 0.29.." />
                                {error.to && <p className='text-red-300 text-sm mt-1'>{error.to}</p>}
                            </div>
                            <div className="mb-2 block">
                                <Label htmlFor="price">RAP</Label>
                            </div>
                            <TextInput id="price" type="number" min={0} value={dimondValue.price} onChange={(e) => setFormDimondValue(e)} placeholder="Enter price" />
                            {error.price && <p className='text-red-300 text-sm mt-1'>{error.price}</p>}
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-4">
                            <Button type="submit" className="bg-black">{dimondId ? "Update" : "Add New"}</Button>
                            {dimondId ? <Button onClick={()=> cancleEdite()} type="submit" className="bg-black">Cancle</Button> : ""}
                            
                        </div>


                    </form>
                </div>

                <div>
                    <h1 className="text-2xl font-bold mb-4">Stone Group List</h1>
                    <StoneGroupTable dimondValue={dimondValue} setDimondValue={setDimondValue} setDimondId={setDimondId} />
                </div>


            </div>

        </>

    )
}

export default Dimond
