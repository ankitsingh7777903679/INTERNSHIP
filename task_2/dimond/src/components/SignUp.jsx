import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { userSignup } from "../api/authServer";
import { Link, useNavigate } from "react-router-dom";
import { validationSignup } from "../validation/signupValidation";
import { toast } from "react-toastify";

function SignUp() {
    const navigate = useNavigate();
    const [signup, setSignup] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [error, setError] = useState({})

    const inputHandeler = (e) => {
        const { id, value } = e.target;
        const updatedValue = { ...signup, [id]: value };
        setSignup(updatedValue);
    }

    const handelLogin = async (e) => {
        e.preventDefault();
        const error = validationSignup(signup)
        setError(error || {});
        if (error) return;

        const res = await userSignup(signup);
        if(res.status === false){
            // alert(res.message);
            toast.error(res.message);
            return;
        }
        toast.success(res.message);
        // console.log("signup",res);
        // localStorage.setItem("token", res.token);
        navigate("/login");
        // window.location.href = "/dimond-price";
    }


    return (
        <div>
            <div className='mx-auto  max-w-md'>
                <div className="">
                    <form onSubmit={handelLogin} className="bg-gray-500 flex max-w-md flex-col gap-4 mt-40 border-2 p-8 rounded-lg">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="username">Username</Label>
                            </div>
                            <TextInput id="username" type="text" value={signup.username} onChange={inputHandeler} placeholder="Your username" />
                            {error.username && <p className='text-red-300 text-sm mt-1'>{error.username}</p>}
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email">Your email</Label>
                            </div>
                            <TextInput id="email" type="email" value={signup.email} onChange={inputHandeler} placeholder="name@flowbite.com" />
                            {error.email && <p className='text-red-300 text-sm mt-1'>{error.email}</p>}
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password">Your password</Label>
                            </div>
                            <TextInput id="password" value={signup.password} onChange={inputHandeler} type="password" />
                            {error.password && <p className='text-red-300 text-sm mt-1'>{error.password}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" />
                            <Label htmlFor="remember">Remember me</Label>
                        </div>
                        <Button type="submit" className="bg-black text-white font-bold py-2 px-4 rounded">Submit</Button>
                        <p>if already have an account <Link to="/login" className="text-blue-500">Login</Link></p>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp
