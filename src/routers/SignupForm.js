import React, { useState } from "react";

function SignupForm() {
  const [formData, setFormData] = useState({
    koreanName: "",
    englishName: "",
    course: "fullstack",
    email: "",
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
      body : JSON.stringify(formData)
    });

    const json = await data.json();  // 응답을 JSON으로 변환
    console.log(json);
    alert(json.message);
    window.location.href = json.redirect;
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          한글 이름:
          <input
            type="text"
            name="koreanName"
            value={formData.koreanName}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          영어 이름:
          <input
            type="text"
            name="englishName"
            value={formData.englishName}
            onChange={handleChange}
            required
          />
        </label>
      </div>
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
      <div>
        <label>
          이메일:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
      </div>
        <button type="submit">회원가입</button>
    </form>
  );
}

export default SignupForm;
