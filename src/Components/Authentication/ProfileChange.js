import { React, useState, Fragment, useEffect } from 'react'
import { useAlert } from "react-alert";
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { userProfileAction, getUserData } from '../../Actions/AuthenticationAction'

const ProfileChange = () => {

    const userInfo = JSON.parse(localStorage.getItem('user-details'))
    const dispatch = useDispatch()
    const { profile } = useSelector((state) => state.profile)
    const { user } = useSelector((state) => state.user)
    
    const alert = useAlert();
    const [firstName, setFirstName] = useState(user && user && user.data && user.data[0].first_name)
    const [speciality, setSpeciality] = useState(profile && profile && profile.data && profile.data[0].speciality)
    const [clinicName, setClinicName] = useState(profile && profile && profile.data && profile.data[0].clinicName)
    const [selectedImage, setSelectedImage] = useState("");
    const [imgSignal, setImageSignal] = useState()
    const [letestImg, setLetestImg] = useState("")

    const updateProfileDataChange = (e) => {
        try{
            const reader = new FileReader();
            reader.onload = () => {
              if (reader.readyState === 2) {
                setImageSignal(true)
                setLetestImg(reader.result)
                setSelectedImage(e.target.files[0]);
              }
            };
            reader.readAsDataURL(e.target.files[0]);
        } catch(error){
            setImageSignal(false)
        }
        
      };
    
    const changeProfile = async () => {
        let id = user && user && user.data && user.data[0].id
        let profileImage = selectedImage
        const myForm = new FormData();
        myForm.set("firstName", firstName);
        myForm.set("speciality", speciality);
        myForm.set("clinicName", clinicName);
        if(imgSignal){
            myForm.set("profileImage", profileImage);
        } else{
            let text = profile && profile && profile.data && profile.data[0].profileImage
            let imageName = text.split("/media/")[1];
            myForm.set("imageName", imageName);
        }
        
        const config = { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${userInfo && userInfo.access}` } }
        const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/authentication/user-profile-change/${id}/`, myForm, config)
        if (data.status === 202){
            alert.success(data.details)
            return
        } else{
            alert.error("not updated!")
        }
        
    }
      
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
            <div>Profile Change</div>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Speciality"
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Clinic Name"
                    value={clinicName}
                    onChange={(e) => setClinicName(e.target.value)}
                />

                <div >
                    <img src={ imgSignal ? letestImg : `${process.env.REACT_APP_BACKEND_URL}${profile && profile && profile.data && profile.data[0].profileImage}`} alt="Avatar Preview" />
                    <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={updateProfileDataChange}
                    />
                </div>
                <br/>
                <button onClick={() => changeProfile()}>Change Profile</button>
            </div>
        </Fragment>
    )
}

export default ProfileChange