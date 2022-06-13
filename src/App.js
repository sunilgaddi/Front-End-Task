import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { usersList } from './redux/actionCreators/usersAction'
import axios from 'axios';
import NavBar from './components/navbar/NavBar';
import Users from './components/users/Users';
import './App.css';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const pageOneRes = await axios.get('https://reqres.in/api/users?page=1')
        const pageTwoRes = await axios.get('https://reqres.in/api/users?page=2')
       
        const list= pageOneRes.data.data.concat(pageTwoRes.data.data)
        
        dispatch(usersList(list))      
      }
      catch (error) {
        console.log(error.message)
      }
    }
    fetchAllUsers()

  },[dispatch])

  return (
    <div className="App">
      <NavBar />
      <Users />
    </div>
  );
}

export default App;
