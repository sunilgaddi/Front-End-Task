import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import './Users.css'
import axios from 'axios'


function Users() {
    const { allUsersList, isLoading } = useSelector((state) => state.usersList)
    const [userId, setUserId] = useState('')
    const [userDetails, setUserDetails] = useState('')

    function getUserId(e) {

        if(e.target.getAttribute('class') === 'users__list__btn'){
        let key = e.target.getAttribute('data-key')
        setUserId(key);
        };

        return;
    }

    useEffect(() => {
        if (userId) {
            const fetchSingleUser = async () => {
                try {
                    const response = await axios.get(`https://reqres.in/api/users/${userId}`)
                    setUserDetails(response.data.data)
                }
                catch (error) {
                    console.log(error.message)
                }
            }
            fetchSingleUser()
        }
    }, [userId])

    return (
        <div className='users__list__section'>
            <div onClick={(e) => getUserId(e)} className='users__list__wrapper'>
                <h2>All Users.</h2>
                <div className='users__list'>
                    {isLoading ? <span>Loading .....</span> : 
                        allUsersList?.map((item) => {
                        return <button key={item.id} data-key={item.id} className='users__list__btn'>{item.first_name + " " + item.last_name}</button>
                    })
                    }
                </div>
            </div>

            <div className='user__card__wrapper'>
                {userId ?
                    <>
                        <h2 className='title'>User Details</h2>
                        <div className='user__card'>
                            <img className='user__avatar' src={userDetails?.avatar} alt="avatar" />
                            <div className='user__details__wrapper'>
                                <ul className='user__label__wrapper'>
                                    <li className='user__label list'>First Name</li>
                                    <li className='user__label list'>Last Name</li>
                                    <li className='user__label list'>Email</li>
                                </ul>
                                <ul className='user__info__wrapper'>
                                    <li className='user__firstname list'>{userDetails.first_name}</li>
                                    <li className='user__lastname list'>{userDetails.last_name}</li>
                                    <li className='user__email list'>{userDetails.email}</li>
                                </ul>
                            </div>
                        </div>
                    </>
                    :
                    <div className='user__card placeholder'>
                        <span>Click on the button to view user details.</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default Users