function Chat() {

    const logout = async () => {
        try {
            const response = await fetch("http://localhost:8080/logout", {
                method: "POST",
                credentials: 'include',
            });

            const json = await response.json();
            alert("로그아웃 성공")
            // 클라이언트 측에서 리디렉션 처리
            window.location.href = json.redirectUrl;
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    return (
        <button onClick={logout}>로그아웃</button>
    )
}

export default Chat