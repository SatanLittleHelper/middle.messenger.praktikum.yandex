import Profile, {ProfileProps} from "../../modules/profile-page/components/profile/Profile";
import {withProfilePage} from "./WithProfilePage";


class ProfilePage extends Profile {
    constructor(props: ProfileProps) {
        super(props);
    }
}


// @ts-ignore
export default withProfilePage(ProfilePage);
