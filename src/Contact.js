import { useState, useEffect, useRef } from "react";
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const containerRef = useRef('');

  const fetchUsers = async () => {
    setLoading(true);
    const response = await axios.get(`https://randomuser.me/api/?results=100`);
    setUsers([...users, ...response.data.results]);
    setLoading(false);
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (container.scrollTop + container.clientHeight === container.scrollHeight && !loading) {
      setLoading(true);
      setTimeout(() => {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }, 1000);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [containerRef.current]);

  useEffect(() => {
    fetchUsers();
  }, [pageNumber]);
  
  

  const handleLogin = () => {
    if (username === 'foo' && password === 'bar') {
      setIsLoggedIn(true);
    }
  };
 
  const handlelogout = () => {
    window.location.reload();
  };

  if (isLoggedIn) {
    return (
        <div>
            <button  type='button' onClick={handlelogout} className="btn btn-success pull-right">Logout</button>
            <div className="container" style={{height:320 ,width:480} }>
                <h1 className="mt-4">Contact List</h1>
                <div className="card mt-4" style={{ height: "400px" }}>
                    <div className="card-body" ref={containerRef} style={{ overflow: "auto" }}>
                    <ul className="list-group">
                        {users.map((user, index) => (
                        <li key={index} className="list-group-item">
                            <div className="row align-items-center">
                            <div className="col-2">
                                <img src={user.picture.thumbnail} alt="User" className="img-thumbnail" />
                            </div>
                            <div className="col-10">
                                <h5>{user.name.first} {user.name.last}</h5>
                            </div>
                            </div>
                        </li>
                        ))}
                    </ul>
                    {loading && <p className="text-center mt-3">Loading...</p>}
                    </div>
                </div>
                </div>
        </div>
    );
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" id="username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
       

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
