import {useState} from "react";
import {FormField} from "../../components/form.fields.jsx";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layout/authLayout.jsx";

const ENVIRONMENT = import.meta.env.ENVIRONMENT;
let API_URL = "";
if(!ENVIRONMENT || ENVIRONMENT === "development"){
  API_URL = import.meta.env.LOCAL_URL
}
else{
  API_URL = import.meta.env.HOSTED_URL
}


function SignUp(){
    const navigate = useNavigate();
    const [registered, setRegistered] = useState(false);
    const [form, setForm] = useState({username:"", email:"", password:""});
    const handleChange = (e) => {
        const new_form = {
        ...form,
        [e.target.name]:e.target.value
        };
        setForm(new_form)
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch(`${API_URL}/auth/register/`, {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(form)
        })
        const data = await response.json();
        if(!data.success){
            alert("Failed to register user");
        }
        setRegistered(true);
    }

return (
<div>
    <div className="flex bg-gray-200 flex-col justify-center align-center">
        {registered ? (
            <div className="min-w-30 flex flex-col mx-auto my-auto">
                   <img src="/check.png" className="w-35 h-35 md:w-10 md:h-10 mx-auto"/>
                   <p className="text-xl font-bold mx-auto">Email successfully sent, check mail</p>  
                </div>
        ) : (
        <div className="flex flex-col bg-gray-100 gap-4 w-full mx-auto my-auto px-10 rounded-lg shadow-lg">
            <h1 className="text-2xl font-extrabold my-10  mx-auto">Get Started now</h1>
            <form className="flex flex-col gap-2 w-full " onSubmit={handleSubmit}>
                <FormField labelText="User Name" type="text" name="username" placeholder="Username" onChange={handleChange} />
                <FormField labelText="Email" type="email" placeholder="Email" name="email" onChange={handleChange}/>
                <FormField labelText="Password" type="password" placeholder="Password" name="password" onChange={handleChange}/>
                <div className="flex flex-row my-3 gap-1">
                <input type="radio" />
                <p>I agree to the <span className="underline">terms and policy</span></p>
            </div>
                <button type="submit" className="btn bg-blue-600 p-2 w-full font-semibold text-white rounded-md">Sign Up</button>
            </form>
            <p className="mx-auto my-2">or</p>
            <div className="flex flex-row gap-5 mx-auto ">
                <button className="btn bg-gray-100 p-1 rounded-md border border-gray-200 text-sm flex flex-row gap-1"><img className="w-[1.2rem] h-[1.2rem]" src="/google.png"/><p> Sign in with Google</p></button>
                <button className="btn bg-gray-100 rounded-md border border-gray-200 text-sm p-1 flex flex-row gap-1"><img className="w-[1.2rem] h-[1.2rem]" src="/apple.png"/><p>Sign in with Apple</p></button>
            </div>
             <div className="flex flex-row gap-2 my-4 mx-auto text-sm">
                <p>Have an account</p>
                <a onClick={()=>{navigate("/")}} className="underline text-blue-600">Sign In</a>
            </div>
            </div>
        )}
        </div>
        </div>
    )
}

export default function SignUpPage(){
    return (
        <AuthLayout>
            <SignUp />
        </AuthLayout>
    )
}