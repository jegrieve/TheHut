import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

const UserInfo = (props) => {
    const [imageData, setImageData] = useState({
        image: null
      });
    const [editImage, setEditImage] = useState(false);

    console.log(props.userData)


    useEffect(() => {
        if (!imageData.image) {
          setEditImage(false);
        }
      }, [imageData])

      
  useEffect(() => {
    // if (editBio === "submitted") {
    //   props.updateProfileBio(props.userData.id, bioText);
    // }
    if (editImage === "submitted") {
      props.updateProfileImage(props.userData.id, imageData);
    }
  }, [editImage]) //editBio 

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


      const onImageChange = (e) => {
        setImageData((prev) => ({
            image: e.target.files[0]
        }))
       };
    return (
        <div>
            <div className = "show-user-info">
                <div className = "show-user-username">test</div>
                {props.userData.profile_image ? 
                    <div>
                        <img className = "show-user-img" src = {props.userData.profile_image.url} />
                    </div>
                    :
                    <div className = "show-user-placeholder">
                        <FontAwesomeIcon icon = {faUserCircle} color = "#f9a826" size = "6x"/>
                    </div>
                }
                {editImage === true ? 
                 <div>
                  <div className = "form-group" >
                    <input className = "form-control" name = "image" type="file" accept="image/*" multiple={false} onChange={onImageChange} /> 
                  </div>
                  <button className = "btn btn-success" onClick = {saveEditImage}>Save</button>
                  <button  className = "btn btn-danger" onClick = {exitEditImage}>Cancel</button>
                 </div> :
                  <div>
                      <button onClick = {handleImage}>Edit</button>
                 </div>}
            </div>
        </div>
    )
}


export default UserInfo;