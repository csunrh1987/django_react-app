import {useState, useEffect} from "react"
import api from "../api"
import Note from "../components/Note"

function Home() {
    const [notes, setNotes] = useState([])
    const [context, setContext] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {
        getNotes();
    }, [])
    
    const getNotes = () => {
        api.get("/api/notes/")
        .then((res) => res.data)
        .then((data)=> {setNotes(data); 
                        console.log(data)})
        .catch((err) => alert(err))
    }

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted")
                else alert("Failed")
                getNotes()
                })
            .catch((error) => alert(error))

        
    }

    const createNote = (e) => {
        e.preventDefault()
        api.post("/api/notes/", { context,title })
            .then((res) => {
                if (res.status === 201) alert("Note created")
                else alert("Failed to make")
                getNotes();
            })
            .catch((err) => alert(err))
                
    }
    return ( 
        <div>
            <div>
                <h2>Notes</h2>
                {notes.map((notes) => <Note note={notes} onDelete={deleteNote} key={notes.id}/>)}
            </div>
        
            <h2>Create a Form</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    required 
                    onChange={(e)=> setTitle(e.target.value)} 
                    value={title}/>

                <label htmlFor="context">Context:</label>
                <br />
                <textarea 
                    id="context" 
                    name="context" 
                    required 
                    onChange={(e)=> setContext(e.target.value)} 
                    value={context}/>                
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    )



}



export default Home