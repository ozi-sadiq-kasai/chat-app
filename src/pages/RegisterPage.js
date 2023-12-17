import { useContext,useState} from "react"
import AuthContext from "../ContextProvider"
import { Link } from "react-router-dom"


const RegisterPage = () => {
 const {handleUserRegister} = useContext(AuthContext)

const [credentials,setCredentials] = useState({
 name:'',
 email:'',
 password1:'',
 password2:''
})
 

 const handleInputChange = (e)=>{
 let name = e.target.name
 let value = e.target.value

 setCredentials({...credentials,[name]:value})
}

  return (
   <div className='auth--container'>
     <div className='form--wrapper'>
      <form onSubmit={(e)=>handleUserRegister(e,credentials)}>

       <div className="field--wrapper">
        <label htmlFor="name">Name:</label>
        <input type="text"
         required
         name='name'
         placeholder='Enter Name'
         value={credentials.name}
         onChange={handleInputChange}/>
       </div>

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
        <label htmlFor="password1">Password:</label>
        <input type="password"
         required
         name='password1'
         placeholder='Enter Password'
         value={credentials.password1}
         onChange={handleInputChange}/>
       </div>

       <div className="field--wrapper">
        <label htmlFor="password2">Confirm Password:</label>
        <input type="password"
         required
         name='password2'
         placeholder='Confirm Password'
         value={credentials.password2}
         onChange={handleInputChange}/>
       </div>

       <div className='field--wrapper'>
        <input type="submit"value="Login" className='btn btn--lg btn--main'/>
       </div>

      </form>
      <p>Already have an account? Login <Link to="/login">HERE</Link></p>
     </div>
     
    </div>
  )
}
export default RegisterPage