import {useState,useEffect,useContext} from 'react'
import AuthContext from "../ContextProvider"
import client,{ databases,DATABASE_ID,COLLECTION_ID_MESSAGES } from "../appwriteConfig"
import { ID,Query,Role,Permission } from 'appwrite'
import { Trash2 } from 'react-feather'
import Header from '../components/Header'

const Room = () => {
const[messages,setMessages]=useState([])
const [messageBody,setMessageBody] = useState('')
const {user} = useContext(AuthContext)

 useEffect(()=>{
  getMessages()
  // Subscribe to files channel
 const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, response => {

            if(response.events.includes("databases.*.collections.*.documents.*.create")){
                console.log('A MESSAGE WAS CREATED')
                setMessages(prevState => [response.payload, ...prevState])
            }

            if(response.events.includes("databases.*.collections.*.documents.*.delete")){
                console.log('A MESSAGE WAS DELETED!!!')
                setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id))
            }
        });

        console.log('unsubscribe:', unsubscribe)
      
        return () => {
          unsubscribe();
        };
 },[])

 // read/list a document from database
  const getMessages = async()=>{
   const response = await databases.listDocuments(DATABASE_ID,COLLECTION_ID_MESSAGES,
    [
     Query.orderDesc('$createdAt'),
     Query.limit(10)
    ]
    )
   setMessages(response.documents)
  }

// create a document to the database 
const handleSubmit = async (e)=>{
 e.preventDefault()
 let payload = {
  user_id: user.$id,
  username:user.name,
  body:messageBody
 }

 let permissions =[
  Permission.write(Role.user(user.$id))
 ]
 let response =await databases.createDocument(
    DATABASE_ID,
    COLLECTION_ID_MESSAGES,
    ID.unique(),
    payload,
    permissions
)
// console.log('created',response)
// setMessages(prevState=>[response,...messages])
setMessageBody('')
}

// delete a document from database and window
const handleDelete = async(messageID)=>{
  databases.deleteDocument(
  DATABASE_ID,
    COLLECTION_ID_MESSAGES,
   messageID,
  );
 // setMessages(prevState=>messages.filter(message =>message.$id !== messageID))
}




  return (
    <main className="container">
     <Header/>
    <div className="room--container">
     
     <form id="message--form" onSubmit={handleSubmit}>
      <div>
       <textarea 
       required
       onChange={e=>setMessageBody(e.target.value)}
       value={messageBody}
       placeholder="what's on your mind"
       maxLength='1000'
       >
       </textarea>
       <div className='send-btn--wrapper' >
        <input className='btn btn--secondary' type="submit" value='Send' />
       </div>
      </div>

     </form>
        <div>
      {messages.map((message)=>(
       <div key={message.$id}>
        <div className='message--wrapper'>
         <div className='message--header'>
               <p>
         {message?.username ? (
           <span>{message.username}</span>
         ) : (
           <span>anonymous user</span>
         )}
                 <small className='message-timestamp'>{new Date(message.$createdAt).toLocaleString()}</small>
       </p>
          {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                            <Trash2 className="delete--btn" onClick={() => {handleDelete(message.$id)}}/>
                            
                        )}
         
         </div>
         <div className='message--body'>
         <span>{message.body}</span>
         </div>
        </div>
       </div>
      ))}
     </div>
     </div>
    
    </main>
  )
}
export default Room



