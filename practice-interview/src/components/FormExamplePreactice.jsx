import React, { useState } from 'react'

const FormExamplePreactice = () => {
    const [formInput , selectFormInput] = useState({
  fullname: "",
  email: "",
  gender: "",
  skills: [],
  country: "",
  date:"",
  time:""
});
    const [error, setErrors] = useState({});

    const handleChange =(e)=>{
      const {name , value , type , checked} = e.target
      if(type ==="checkbox"){
        let updateSkills = [...formInput.skills]
        if(checked){
            updateSkills.push(value)
        }else{
            updateSkills = updateSkills.filter((s)=> s !== value);
        }

        selectFormInput({...formInput , [name] : updateSkills})
      }else{
        selectFormInput({...formInput , [name]: value})
      }
      console.log(name , value)
    }

    function isValidate(){
        let newErrors = {};

        if(!formInput.fullname){
            newErrors.fullname = "Please enter your full name"
        }
        if(!formInput.email){
            newErrors.email = "Email is required"
        }else if(!/\S+@\S+\.\S+/.test(formInput.email)){
            newErrors.email = "Enter valid email"
        }
         if(!formInput.gender){
            newErrors.gender = "Please enter your Gender"
        }
         if(!formInput.skills.length){
            newErrors.skills = "Please enter a skill"
        }

        return newErrors
    }

   const handleSubmit = (e)=>{
    e.preventDefault();

    let validate = isValidate();
    if(Object.keys(validate).length > 0){
        setErrors(validate);
    }else{
        alert("Submit form")
    selectFormInput({
  fullname: "",
  email: "",
  gender: "",
  skills: [],
  country: "",
  date:"",
  time:""
})
    setErrors({})
    }

   }

   console.log(formInput)
  return (
    <form onSubmit={handleSubmit}>
        <input type="text" name='fullname' placeholder='Enter your name' value={formInput.fullname} onChange={handleChange}/>
        <p style={{ color: "red" }}>{error.fullname}</p>
        <br />
        <input type='email' name='email' placeholder='Enter your email' value={formInput.email} onChange={handleChange}/>
          <p style={{ color: "red" }}>{error.email}</p>
        <div>
        Gender Type:
        <input type="radio" name="gender" value="male" checked={formInput.gender === "male"} onChange={handleChange}/>Male 
        <input type="radio" name="gender" value="female" checked={formInput.gender === "female"} onChange={handleChange}/> female

         <p style={{ color: "red" }}>{error.gender}</p>
        </div>
        
        <div>
        Select Your Skills:
        <input type='checkbox' name='skills' value="next" checked={formInput.skills.includes("next")} onChange={handleChange}/>Next
        <input type='checkbox' name='skills' value="react" checked={formInput.skills.includes("react")} onChange={handleChange}/>React
        <input type='checkbox' name='skills' value="js" checked={formInput.skills.includes("js")} onChange={handleChange}/>JavaScript

        <p style={{ color: "red" }}>{error.skills}</p>
        </div>
        <div>
            Select Your country: 
            <select name="country"  value={formInput.country} onChange={handleChange}>
            <option value="india">India</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
            </select>
        <p style={{ color: "red" }}>{error.country}</p>
        </div>
        <div>
            <input type="date" name="date" value={formInput.date}  onChange={handleChange}/>
            <p>Selected Date: {formInput.date}</p>
        </div>
            <div>
            <input type="time" name="time" value={formInput.time}  onChange={handleChange}/>
            <p>Selected Time: {formInput.time}</p>
        </div>
        <button type='Submit'>Submit</button>
    </form>
  )
}

export default FormExamplePreactice