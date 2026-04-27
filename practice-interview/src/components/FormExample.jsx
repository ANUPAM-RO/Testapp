import React, { useState } from "react";

function FormExample() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    skills: [],
    country: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      let updatedSkills = [...formData.skills];

      if (checked) {
        updatedSkills.push(value);
      } else {
        updatedSkills = updatedSkills.filter((skill) => skill !== value);
      }

      setFormData({
        ...formData,
        [name]: updatedSkills
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select gender";
    }

    if (formData.skills.length === 0) {
      newErrors.skills = "Select at least one skill";
    }

    if (!formData.country) {
      newErrors.country = "Please select country";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Form Data:", formData);
      alert("Form submitted successfully!");
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      {/* Name */}
      <div>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{errors.name}</p>
      </div>

      {/* Email */}
      <div>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{errors.email}</p>
      </div>

      {/* Radio */}
      <div>
        <label>Gender:</label>

        <input
          type="radio"
          name="gender"
          value="male"
          onChange={handleChange}
        /> Male

        <input
          type="radio"
          name="gender"
          value="female"
          onChange={handleChange}
        /> Female

        <p style={{ color: "red" }}>{errors.gender}</p>
      </div>

      {/* Checkbox */}
      <div>
        <label>Skills:</label>

        <input
          type="checkbox"
          name="skills"
          value="React"
          onChange={handleChange}
        /> React

        <input
          type="checkbox"
          name="skills"
          value="Node"
          onChange={handleChange}
        /> Node

        <input
          type="checkbox"
          name="skills"
          value="JavaScript"
          onChange={handleChange}
        /> JavaScript

        <p style={{ color: "red" }}>{errors.skills}</p>
      </div>

      {/* Dropdown */}
      <div>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
        >
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
        </select>

        <p style={{ color: "red" }}>{errors.country}</p>
      </div>

      <button type="submit">Submit</button>

    </form>
  );
}

export default FormExample;