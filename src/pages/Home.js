import { useState, useEffect, useRef } from "react";
import axios from 'axios';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://randomuser.me/api/?=500`);
      setUsers(prevUsers => [...prevUsers, ...response.data.results]);
      setPageNumber(prevPageNumber => prevPageNumber + 1);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (container.scrollTop + container.clientHeight === container.scrollHeight && !loading && hasMore) {
      setLoading(true);
      setTimeout(() => {
        fetchUsers();
      }, 2000);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
  
  useEffect(() => {
    if (users.length >= 5) {
      setHasMore(false);
    }
  }, [users]);

  const handleLogin = () => {
    if (username === 'foo' && password === 'bar') {
      setIsLoggedIn(true);
    }
  };
 
  const handlelogout = () => {
    window.location.reload();
  };
   
  const myFunction=()=> {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  } 

  if (isLoggedIn) {
    return (
        <div>
            <button  type='button' onClick={handlelogout} className="btn btn-outline-success my-2 my-sm-0 log" >Logout</button>
            <div className='container' style={{width:480 ,height:480}}>
                <h1 className='mt-4'>Contact List</h1>
                <div className='card mt-4' style={{ height: '400px' }}>
                <div className='card-body' ref={containerRef} style={{ overflow: 'auto' }}>
                    <ul className='list-group'>
                    {users.map((user, index) => (
                        <li key={index} className='list-group-item'>
                        <div className='row align-items-center'>
                            <div className='col-2'>
                            <img src={user.picture.thumbnail} alt='User' className='img-thumbnail' />
                            </div>
                            <div className='col-10'>
                            <h5>{user.name.first} {user.name.last}</h5>
                            </div>
                        </div>
                        </li>
                    ))}
                    </ul>
                    {loading && <p className='text-center mt-3'>Loading...</p>}
                </div>
                </div>
            </div>
        </div>
    );
  }

  return (
    
    <div className="container conta d-flex justify-content-center align-items-center">
      <div className="card p-3">
        <div className="card-body">
          <h2 className="card-title mb-4">Login</h2>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>

    
  );
};

export default Home;
