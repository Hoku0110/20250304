import { useState } from "react";

export default function LoginPage() {
  const [users, setUsers] = useState([
    { name: "User1", account: "user1", password: "pass1" },
    { name: "User2", account: "user2", password: "pass2" }
  ]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = () => {
    const user = users.find(u => u.account === account && u.password === password);
    if (user) {
      setLoggedInUser(user);
      setUsername("");
      setAccount("");
      setPassword("");
    } else {
      alert("登入失敗，請檢查帳號和密碼");
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  const handleUpdate = () => {
    const updatedUsers = users.map(u => 
      u.account === loggedInUser.account ? { ...u, name: username || u.name, account: account || u.account, password: password || u.password } : u
    );
    setUsers(updatedUsers);
    setLoggedInUser(updatedUsers.find(u => u.account === (account || loggedInUser.account)));
    setUsername("");
    setAccount("");
    setPassword("");
  };

  const handleDelete = () => {
    setUsers(users.filter(u => u.account !== loggedInUser.account));
    setLoggedInUser(null);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", textAlign: "center", backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "10px" }}>使用者資料</h2>
      {loggedInUser && <h3>目前登入帳號: {loggedInUser.name}</h3>}
      <table style={{ width: "80%", margin: "0 auto 20px", borderCollapse: "collapse", backgroundColor: "white" }}>
        <thead>
          <tr style={{ backgroundColor: "#007bff", color: "white" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>名稱</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>帳號</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>密碼</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{user.name}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{user.account}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {!loggedInUser ? (
        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", width: "300px", margin: "0 auto", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <h2>登入</h2>
          <input type="text" placeholder="帳號" value={account} onChange={e => setAccount(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }} />
          <input type="password" placeholder="密碼" value={password} onChange={e => setPassword(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }} />
          <button onClick={handleLogin} style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>登入</button>
        </div>
      ) : (
        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", width: "300px", margin: "0 auto", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <h2>修改使用者資訊</h2>
          <input type="text" placeholder="新名稱" value={username} onChange={e => setUsername(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }} />
          <input type="text" placeholder="新帳號" value={account} onChange={e => setAccount(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }} />
          <input type="password" placeholder="新密碼" value={password} onChange={e => setPassword(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }} />
          <button onClick={handleUpdate} style={{ width: "100%", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginBottom: "5px" }}>更新</button>
          <button onClick={handleDelete} style={{ width: "100%", padding: "10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginBottom: "5px" }}>刪除帳號</button>
          <button onClick={handleLogout} style={{ width: "100%", padding: "10px", backgroundColor: "#ffc107", color: "black", border: "none", borderRadius: "4px", cursor: "pointer" }}>登出</button>
        </div>
      )}
    </div>
  );
}