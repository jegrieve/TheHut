import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faEdit } from '@fortawesome/free-solid-svg-icons'

const UserInfo = (props) => {
    const [imageData, setImageData] = useState({
        image: null
      });
    const [editImage, setEditImage] = useState(false);
    const [bioText, setBioText] = useState("");
    const [editBio, setEditBio] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
      console.log("pineapples")
    useEffect(() => {
        if (props.userData.bio) {
          setBioText(props.userData.bio)
        }
      },[])
  
    useEffect(() => {
        if (!imageData.image) {
          setEditImage(false);
        }
      }, [imageData])

      
  useEffect(() => {
    if (editBio === "submitted") {
      props.updateProfileBio(props.userData.id, bioText);
    }
    if (editImage === "submitted") {
      props.updateProfileImage(props.userData.id, imageData);
    }
  }, [editImage, editBio]) 

    const saveEditImage = () => {
        setEditImage("submitted")
    }

    const exitEditImage = () => {
        setImageData({
          image: null
        })
      }

      const handleImage = () => {
        if (!editImage || editImage === "submitted") {
          setEditImage(true)
        } else {
          setEditImage(false)
        }
       }

       const handleBio = () => {
        if (!editBio || editBio === "submitted") {
          setEditBio(true)
        } else {
          setEditBio(false)
        }
      }

      const onImageChange = (e) => {
        setImageData((prev) => ({
            image: e.target.files[0]
        }))
       };

       const onBioInputChange = (e) => {
        setBioText(e.target.value);
      }

      const saveEditBio = () => {
        setEditBio("submitted")
      }

      const exitEditBio = () => {
        setEditBio(!editBio)
      }

      const toggleConfirmDelete = () => {
        setConfirmDelete(!confirmDelete)
      }

      const cancelDelete = () => {
        setConfirmDelete(false);
      }

      const deleteUser = () => {
        const url = `/api/v1/users/destroy/${props.userData.id}`;
        const token = document.querySelector('meta[name="csrf-token"]').content;
      
        fetch(url, {
          method: "DELETE",
          headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
          }
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then((response) => {
            props.setCurrentUser(null);
            props.history.push("/")
          })
          .catch(error => console.log(error.message));    
      }

    return (
        <div className = "show-user-info-page">
            <div className = "show-user-info">
                <div className = "show-user-username">{props.userData.username}</div>
                {props.userData.profile_image ? 
                    <div>
                        <img className = "show-user-img" src = {props.userData.profile_image.url} />
                    </div>
                    :
                    <div className = "show-user-placeholder">
                        <FontAwesomeIcon icon = {faUserCircle} color = "#f9a826" size = "6x"/>
                    </div>
                }
                {props.userEdit &&
                editImage === true ? 
                 <div>
                  <div className = "form-group" >
                    <input className = "form-control" name = "image" type="file" accept="image/*" multiple={false} onChange={onImageChange} /> 
                  </div>
                  <button className = "btn btn-success save-btn" onClick = {saveEditImage}>Save</button>
                  <button  className = "btn btn-danger cancel-btn" onClick = {exitEditImage}>Cancel</button>
                 </div> : props.userEdit ?
                  <div onClick = {handleImage} className = "d-flex justify-content-center align-items-center show-user-edit">
                        <FontAwesomeIcon icon = {faEdit} color = "#f9a826" />
                        <div>Image</div>
                 </div> : false}

            {props.userEdit &&
            editBio === true ? 
            <div>
              <div>
                <div className = "show-user-bio-title">Bio</div>
                <textarea  className = "show-user-bio-edit" value = {bioText} onChange = {onBioInputChange} maxLength = "400"/>
              </div>
                <button className = "btn btn-success save-btn" onClick = {saveEditBio}>Save</button>
                <button className = "btn btn-danger cancel-btn" onClick = {exitEditBio}>Cancel</button>
            </div> 
            : 
            <div>
                <div>
                {!props.userData.bio ? <div>This user has not set a bio.</div> : 
                <div>
                  <div className = "show-user-bio-title">Bio</div>
                  <div className = "show-user-bio">{props.userData.bio}</div>
                </div>}
                </div>
                    {props.userEdit ? 
                    <div onClick = {handleBio} className = "d-flex justify-content-center align-items-center show-user-edit">
                        <FontAwesomeIcon icon = {faEdit} color = "#f9a826" />
                        <div>Bio</div>
                    </div>
                     : false}
            </div>} 
            </div>
            {props.userEdit ? 
             !confirmDelete ?
                  <div className = "delete-user-btn">
                    <button className = "btn btn-warning" onClick = {toggleConfirmDelete}>Delete User</button>
                  </div> 
                  : 
                  <div className = "delete-user-btn">
                    <div className = "red-text">Warning: delete user and all associated posts/boards/comments/likes.</div>
                    <button className = "btn btn-danger save-btn" onClick = {deleteUser}>Confirm Delete</button>
                    <button className = "btn btn-primary cancel-btn" onClick = {cancelDelete}>Cancel</button>
                  </div> 
                  : false}
        </div>
    )
}


export default UserInfo;