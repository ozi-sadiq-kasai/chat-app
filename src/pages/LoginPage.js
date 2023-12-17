import { useEffect,useContext,useState} from "react"
import AuthContext from "../ContextProvider"
import { useNavigate,Link } from "react-router-dom"

const LoginPage = () => {
const [credentials,setCredentials] = useState({
 email:'',
 password:''
})

const {user,handleUserLogin} = useContext(AuthContext)
const navigate= useNavigate()

useEffect(()=>{
 if(user){
navigate('/')
 }
},[])

const handleInputChange = (e)=>{
 let name = e.target.name
 let value = e.target.value

 setCredentials({...credentials,[name]:value})
 console.log(credentials)
}


  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    handleUserLogin(e, credentials);
  };

  return (
    <div className='auth--container'>
     <div className='form--wrapper'>
      <form onSubmit={handleSubmit}>
       <div className="field--wrapper">
        <label htmlFor="email">Email:</label>
        <input type="email"
         required
         name='email'
         placeholder='Enter your email'
         value={credentials.email}
         onChange={handleInputChange}/>
       </div>
         <div className="field--wrapper">
        <label htmlFor="password">Password:</label>
        <input type="password"
         required
         name='password'
         placeholder='Enter Password'
         value={credentials.password}
         onChange={handleInputChange}/>
       </div>
       <div className='field--wrapper'>
        <input type="submit"value="Login" className='btn btn--lg btn--main'/>
       </div>
      </form>
      <p>Don't have an account? Register <Link to="/register">HERE</Link></p>
     </div>
     
    </div>
  )
}
export default LoginPage