import NavBar from '../components/NavBar';
import UserProfile from '../components/UserProfile';
import ProfilePost from '../components/ProfilePost';
import Footer from '../components/Footer';
 
function Profile(){
    return(
        <div>
            <NavBar></NavBar>
            <div className='users-profile'>
                <UserProfile></UserProfile>
                <ProfilePost></ProfilePost>
                <Footer></Footer>
            </div>
        </div>
    );
}
export default Profile;