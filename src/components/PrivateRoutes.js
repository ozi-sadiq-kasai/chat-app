import { Outlet,Navigate } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../ContextProvider"

const PrivateRoutes = () => {
 const {user} = useContext(AuthContext)
 // const user = false
  return (
    <div>
{user ? <Outlet/> : <Navigate to='/login'/>}
    </div>
  )
}
export default PrivateRoutes