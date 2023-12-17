import { LogOut } from "react-feather"
import {useContext} from "react"
import AuthContext from "../ContextProvider"


const Header = () => {
 const {user,handleUserLogout} = useContext(AuthContext)
  return (
    <div id="header--wrapper">
      {user ? (
       <>
       Welcome {user.name}
       <LogOut onClick={handleUserLogout} className="header--link"/>
       </>
      ):(<button>Login</button>)}
    </div>
  )
}
export default Header