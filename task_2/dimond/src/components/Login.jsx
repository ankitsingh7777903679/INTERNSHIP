import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { validationLogin } from "../validation/loginValidation";
import { userLogin } from "../api/authServer";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState({})

    const inputHandeler = (e) => {
        const { id, value } = e.target;
        const updatedValue = { ...login, [id]: value };
        setLogin(updatedValue);


    }

    const handelLogin = async (e) => {
        e.preventDefault();
        const error = validationLogin(login)
        setError(error || {});
        if (error) return;

        const res = await userLogin(login);
        console.log("login",res);
        if(res.status === false){
            toast.error(res.message);
            return;
        }
        toast.success(res.message);
        localStorage.setItem("token",res.token);

        localStorage.setItem("user",JSON.stringify(res.user));
        navigate("/");
        // window.location.href = "/dimond-price";

    }


    return (
        <div className='mx-auto  max-w-md'>
            <div className="">
                <form onSubmit={handelLogin} className="bg-gray-500 flex max-w-md flex-col gap-4 mt-40 border-2 p-8 rounded-lg">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email">Your email</Label>
                        </div>
                        <TextInput id="email" type="email" value={login.email} onChange={inputHandeler} placeholder="name@flowbite.com" />
                        {error.email && <p className='text-red-300 text-sm mt-1'>{error.email}</p>}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password">Your password</Label>
                        </div>
                        <TextInput id="password" value={login.password} onChange={inputHandeler} type="password" />
                        {error.password && <p className='text-red-300 text-sm mt-1'>{error.password}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>
                    <Button type="submit" className="bg-black text-white font-bold py-2 px-4 rounded">Submit</Button>
                    <p>if not have a account <Link to="/signup" className="text-blue-500">Sign Up</Link></p>
                </form>



            </div>
        </div>
    )
}

export default Login
