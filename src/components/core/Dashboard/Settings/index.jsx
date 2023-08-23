import ChangeProfilePicture from "./ChangeProfilePicture";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";

export default function Settings(){
    return(
        <>
            <h1>
                Edit Profile
            </h1>
            <ChangeProfilePicture/>
            <EditProfile/>
            <UpdatePassword/>
            <DeleteAccount/>
        </>
    )
}