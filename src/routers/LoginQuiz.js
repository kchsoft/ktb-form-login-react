import React, { useState } from "react";
import { Link } from "react-router-dom";

function LoginQuiz() {
  const [quizAnswer, setQuizAnswer] = useState("");
  const [showLoginButton, setShowLoginButton] = useState(false);

  const handleChange = (event) => {
    setQuizAnswer(event.target.value);
  };

  const quizAnswerSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/checkAnswer?quizAnswer=${quizAnswer}`, {
            credentials: 'include'
          });
      const result = await response.json();
      console.log(result);

      if (result === true) {
        setShowLoginButton(result);
      } else if (result === false) {
        setShowLoginButton(result);
        alert("틀렸습니다!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!showLoginButton) {
    return (
      <div>
        <input type="text" onChange={handleChange} name="quizAnswer" placeholder="a 입력시 통과"/>
        <button onClick={quizAnswerSubmit}>제출</button>
      </div>
    );
  }

  if (showLoginButton) {
    return (
      <div>
        <a href="http://localhost:8080/oauth2/authorization/kakao">로그인</a>
        <Link to={"/signupForm"}>회원가입</Link>
      </div>
    );
  }
}

export default LoginQuiz;
