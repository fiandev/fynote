

export default function InputFloating ({ onInput, name, type = "password", label = "label", inValid = null, children }) {
  return (
    <div className="relative z-0 w-full group">
          <div className="relative z-0 w-full group">
            <input onChange={onInput} type={type} name={name} id={name} className={ `block py-2 px-0 w-full text-sm text-dark dark:text-light bg-transparent border-0 border-b-2 border-subprimary appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${ inValid ? "border-rose-300" : "" }`} placeholder="" />
            <label for="password" className={ `peer-focus:font-medium absolute text-sm text-dark dark:text-light duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-subprimary peer-focus:dark:text-subprimary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${ inValid ? "text-rose-300" : "" }`}>
              {label}
            </label>
          </div>
          {
            inValid && <p className="capitalize text-rose-300 font-semibold text-xs">{inValid}</p>
          }
        </div>
    )
}