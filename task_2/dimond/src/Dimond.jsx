
import { Button, Checkbox, Label, TextInput, Select } from "flowbite-react";
import { useState } from "react";
import { insertDimond } from "./api/dimondServer";
import DimondTable from "./components/DimondTable";
import DimondPrice from "./DimondPrice";
function Dimond() {
    const [dimondValue, setDimondValue] = useState({
        shape: "",
        color: "",
        clarity: "",
        from: "",
        to: "",
        price: ""
    });

    const handelFormDimond = async (e) => {
        e.preventDefault();
        // alert("Dimond Value Submitted");
        console.log("Dimond Value Submitted:", dimondValue);
        let res = await insertDimond(dimondValue);
        console.log("Response from server:", res);
        if (res.status === true) {
            alert(res.message);
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
            alert(res.message || "Failed to insert dimond data.");
        }
    }


    return (
        <>
        <div className="p-4 grid grid-cols-3 gap-7">
            <div className="">
                <h1 className="text-2xl font-bold mb-4">ADD Dimond</h1>
                <form onSubmit={handelFormDimond} className="flex w-full flex-col gap-4 bg-gray-500 p-4 rounded-lg">
                    
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="shape">Shape</Label>
                        </div>
                        <Select id="shape" value={dimondValue.shape} onChange={(e) => setDimondValue({ ...dimondValue, shape: e.target.value })} required>
                            <option value="">Select shape</option>
                            <option value="round">Round</option>
                            <option value="pear">Pear</option>
                            <option value="heart">Heart</option>
                        </Select>
                    </div>
                    <div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="color">Color</Label>
                            </div>
                            <Select id="color" value={dimondValue.color} onChange={(e) => setDimondValue({ ...dimondValue, color: e.target.value })} required>
                                <option value="">Select color</option>
                                <option value="G">G</option>
                                <option value="H">H</option>
                                <option value="I">I</option>
                                <option value="J">J</option>
                            </Select>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="clarity">Clarity</Label>
                            </div>
                            <Select id="clarity" value={dimondValue.clarity} onChange={(e) => setDimondValue({ ...dimondValue, clarity: e.target.value })} required>
                                <option value="">Select clarity</option>
                                <option value="SI1">SI1</option>
                                <option value="VS1">VS1</option>
                                <option value="VVS1">VVS1</option>
                                <option value="VVS2">VVS2</option>
                            </Select>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="from">From</Label>
                            </div>
                            <TextInput id="from" type="number" value={dimondValue.from} onChange={(e) => setDimondValue({ ...dimondValue, from: e.target.value })} placeholder="Enter 0.19.." required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="to">To</Label>
                            </div>
                            <TextInput id="to" type="number" value={dimondValue.to} onChange={(e) => setDimondValue({ ...dimondValue, to: e.target.value })} placeholder="enter 0.29.." required />
                        </div>
                        <div className="mb-2 block">
                            <Label htmlFor="price">Price</Label>
                        </div>
                        <TextInput id="price" type="number" value={dimondValue.price} onChange={(e) => setDimondValue({ ...dimondValue, price: e.target.value })} placeholder="Enter price" required />
                    </div>
                
                    <Button type="submit" className="bg-black">Submit</Button>
                </form>
            </div>

            <div>
                <h1 className="text-2xl font-bold mb-4">Show Dimond</h1>
                <DimondTable />
            </div>

           <div>
                <h1 className="text-2xl font-bold mb-4">Find Dimond Price</h1>
                <DimondPrice />
            </div>
        </div>
         
        </>
        
    )
}

export default Dimond
