import React, { useState, useEffect } from "react";

function LoginQuiz() {
  const [quizData, setQuizData] = useState(null); // 서버로부터 받은 퀴즈 데이터를 저장
  const [inputValues, setInputValues] = useState({}); // 입력 필드에 대한 상태
  const [userInput, setUserInput] = useState(""); // 사용자가 입력한 문자
  const [responseMessage, setResponseMessage] = useState(""); // 서버 응답 메시지

  // 서버에서 퀴즈 데이터를 가져오는 함수
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch("http://localhost:8080/login/quiz", {
          credentials: "include",
        });
        const data = await response.json();
        setQuizData(data);

        // 퀴즈 데이터를 기반으로 초기 입력 상태 설정
        const initialInputValues = {
          id: data.id,
          question: data.question,
          explain: data.explain,
        };
        setInputValues(initialInputValues);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, []);

  // 사용자가 입력한 문자를 처리하는 함수
  const handleUserInputChange = (event) => {
    setUserInput(event.target.value);
  };

  // 입력값 변화를 처리하는 함수
  const handleChange = (event, key) => {
    setInputValues({
      ...inputValues,
      [key]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    const formData = {
      id: quizData.id,
      userAnswer: userInput
    };
    const response = await fetch("http://localhost:8080/login/quiz", {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      console.error("서버 응답에 문제가 있습니다:", response.status);
      setResponseMessage("서버에 문제가 발생했습니다. 다시 시도하세요.");
      return;
    }
    console.log(formData);
    try {
      const json = await response.json();  // 응답을 JSON으로 변환
      console.log(json);
      setResponseMessage("응답이 성공적으로 처리되었습니다.");
    } catch (e) {
      console.log(e);
      setResponseMessage("응답 처리 중 오류가 발생했습니다.");
    }
  };

  if (!quizData) {
    return <div>로딩 중...</div>;
  }

  return (
      <div>
        {Object.keys(quizData).map((key) => (
            <div key={key}>
              <label>{key}: </label>
              <input
                  type="text"
                  value={inputValues[key]}
                  onChange={(event) => handleChange(event, key)}
                  disabled={key === "id"} // id는 변경 불가능하게 설정
              />
            </div>
        ))}
        <div>
          <label>답변: </label>
          <input
              type="text"
              value={userInput}
              onChange={handleUserInputChange}
              placeholder="문자를 입력하세요"
              name="userAnswer"
          />
          <button type="button" onClick={handleSubmit}>제출</button>
          {responseMessage && <p>{responseMessage}</p>}
        </div>
      </div>
  );
}

export default LoginQuiz;
