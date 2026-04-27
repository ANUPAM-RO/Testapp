import React , {useState} from 'react'

const Autocomplete = () => {

    let options = ["apple", "banana", "grape", "orange", "pear"];
  return (
    <div>
        <InputField options={options}/>
        
    </div>
  )
}

function InputField({options}) {

    const [inputValue , setInputValue] = useState("");

    const filterOptions = inputValue && options.filter((o)=> o.toLowerCase().includes(inputValue.toLowerCase()));
    return (
        <>
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <Dropdown options={filterOptions || []} />
        </>
    
    )
}

function Dropdown({options}) {
    return (
        <div>
            {options?.map((option) => (
                <button style={{margin: "8px"}} key={option}>{option}</button>
            ))}
        </div>
    )}
export default Autocomplete