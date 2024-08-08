function Chat() {

    const logout = async () => {
        fetch("http://localhost:8080/logout",{
            method: "POST",
            credentials: 'include',
        })
    }

    return (
        <button onClick={logout}>로그아웃</button>
    )
}

export default Chat