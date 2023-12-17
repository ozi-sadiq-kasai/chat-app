import { createContext,useState,useEffect } from "react";
import { account } from "./appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
 const [user,setUser] = useState(null)
 const [loading,setLoading]= useState(true)
 const navigate = useNavigate()

 useEffect(()=>{
  getUserOnLoad()
},[])

const getUserOnLoad = async ()=>{
 try {
   const accountDetails = await account.get()
   setUser(accountDetails)
 } catch (error) {
  console.log(error)
 }
 setLoading(false)
}

const handleUserLogin = async(e,credentials)=>{
e.preventDefault()
try {
 let response = await account.createEmailSession(credentials.email, credentials.password)
           
            console.log('logged:',response)
            const accountDetails = account.get()
            setUser(accountDetails)
            navigate('/')
 
} catch (error) {
 console.error(error)
}
}
const handleUserLogout = ()=>{
 account.deleteSession('current')
 setUser(null)
 console.log('logged out')

}

const handleUserRegister = async(e,credentials)=>{
 e.preventDefault()
 if (credentials.password1 !== credentials.password2){
  alert('Passwords do not match')
  return
 }
 try {
  let response = await account.create(
   ID.unique(),
   credentials.email,
   credentials.password1,
   credentials.name
  
  )
 console.log(response)
await account.createEmailSession(credentials.email,credentials.password1)

const accountDetails = await account.get()
  console.log('accountDetails',accountDetails)
   setUser(accountDetails)
   navigate('/')

 } catch (error) {
  console.error(error)
 }


}

 const contextData ={
  handleUserLogin,
  user,
  handleUserLogout,
  handleUserRegister

 }
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <h1>loading...</h1> : children}
    </AuthContext.Provider>
  )
}
export {AuthProvider}
export default AuthContext