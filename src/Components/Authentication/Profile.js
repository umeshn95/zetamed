import { React, Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userProfileAction, getUserData } from '../../Actions/AuthenticationAction'
import Loader from '../Loading/Loader'

const Profile = () => {
    const dispatch = useDispatch()
    const { profile, loading } = useSelector((state) => state.profile)
    const { user } = useSelector((state) => state.user)

    useEffect(() => {
        if (profile && profile.length === 0) {
            dispatch(userProfileAction())
        }

        if (user && user.length === 0) {
            dispatch(getUserData())
        }
    }, [dispatch, profile, user])


    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div>Profile</div>
                    {
                        profile && profile.data && profile.data.map((e) =>
                            <div key={e.id}>
                                <h1>Name : {user && user && user.data && user.data[0].first_name}</h1>
                                <h1>Email : {user && user && user.data && user.data[0].email}</h1>
                                <h1>Mobile No: {e.mobileNo}</h1>
                                <h1>iAm : {e.iAm}</h1>
                                <h1>Speciality : {e.speciality}</h1>
                                <h1>Clinic Name : {e.clinicName}</h1>
                                <h1>Account Register Date : {e.createdAt}</h1>
                                <img src={`${process.env.REACT_APP_BACKEND_URL}${e.profileImage}`} alt="Avatar Preview" />
                                <br />
                                <Link to={`/profile-change`}><button>Change Profile</button></Link>
                            </div>
                        )
                    }
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile