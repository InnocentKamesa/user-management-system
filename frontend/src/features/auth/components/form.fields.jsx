import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


export function FormField({name, placeholder, type, onChange}){
    return (
        <div className="flex flex-col gap-2 mb-4">
            <input name={name} placeholder={placeholder} onChange={onChange} type={type} className="w-full border rounded-md px-3 py-3 pr-10" />
        </div>
    )
}



export function PasswordField({showPassword, setShowPassword}){
    return (
<div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    className="w-full border rounded-md px-3 py-2 pr-10"
  />

  <button
    type="button"
    onClick={setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2"
  >
    <FontAwesomeIcon
      icon={showPassword ? faEyeSlash : faEye}
    />
  </button>
</div>
    )
}

