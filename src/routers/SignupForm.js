import React, { useState } from "react";

function SignupForm() {
  const [formData, setFormData] = useState({
    course: "fullstack",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    const data = await fetch("http://localhost:8080/signup", {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(formData)
    });

    const json = await data.json();
    console.log(json);
    alert(json.message);
    window.location.href = json.redirectUrl;
  };

  return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            과정:
            <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
            >
              <option value="fullstack">풀스택</option>
              <option value="ai">인공지능</option>
              <option value="cloud">클라우드</option>
            </select>
          </label>
        </div>
        <button type="submit">회원가입</button>
      </form>
  );
}

export default SignupForm;
