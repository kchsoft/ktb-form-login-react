function Chat() {

    const logout = async () => {
        try {
            const response = await fetch("http://localhost:8080/logout", {
                method: "POST",
                credentials: 'include',
            });

            const json = await response.json();
            if(json.successLogout === true){
                alert("로그아웃 성공")
                window.location.href = json.redirectUrl;
            }

        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    const signout = async () => {
        try{
            const data = await fetch("http://localhost:8080/signout", {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            const json = await data.json();
            console.log(json);

            if(json.signoutSuccess === true){
                alert(json.message);
                window.location.href = json.redirectUrl;
            }
        } catch(e){
            console.error("Error during signout:", e)
        }
    }

    return (
        <div>
            <button onClick={logout}>로그아웃</button>
            <button onClick={signout}>회원탈퇴</button>
        </div>
    )
}

export default Chat