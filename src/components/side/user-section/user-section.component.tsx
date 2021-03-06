import React, { useRef } from 'react';
import mime from "mime-types";
import{ IoIosChatboxes } from "react-icons/io";
import { Dropdown, Image } from 'react-bootstrap';
import { UserSectionContainer } from './user-section.styles';

import { useClearUser, useCurrentUser, useSetPhotoURL } from 'utils/redux/reducers/user/user.hook';
import myFirebase from 'utils/firebase/myFirebase';

function UserSection() {

  const user = useCurrentUser();
  const clearUser = useClearUser();
  const setPhotoURL = useSetPhotoURL();

  const fileRef = useRef<HTMLInputElement>( null );
  
  const handleLogOut = () => {
    myFirebase.auth.signOut();
    clearUser();
  };

  const hadleClickFileInput = () => {
    fileRef.current!.click();
  };

  const handleChangeFile = async ( e:React.ChangeEvent<HTMLInputElement> ) => {
    const file = e.target.files![ 0 ];
    const metadata = { contentType: mime.lookup( file.name ) || null } ;
    try {
      const imageSnap = await myFirebase.storage
        .ref()
        .child( `user_image/${user!.uid}` )
        .put( file, metadata );


      if( imageSnap ){
        const photoURL = await imageSnap.ref.getDownloadURL();
        setPhotoURL( photoURL );
        await myFirebase.auth.currentUser?.updateProfile( { photoURL } );
        await myFirebase.database.ref( "users" ).child( user!.uid ).update( { image: photoURL } );
      }

    } catch ( error ) {
      alert( error.message );
    }
  };

  return (
    <UserSectionContainer>
      <h3><IoIosChatboxes/> Tech Talk</h3>
      <div className="content">
        <Image src={user?.photoURL} roundedCircle/>
        <Dropdown>
          <Dropdown.Toggle className="toggle-btn">
            {user?.displayName}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={hadleClickFileInput}>프로필 사진 변경</Dropdown.Item>
            <Dropdown.Item onClick={handleLogOut}> 로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <input ref={fileRef} onChange={handleChangeFile} type="file" style={{ display: "none" }} accept="image/*"/>
    </UserSectionContainer>
  );
}


export default UserSection;
