import React from "react";

function Note({note, onDelete}){
    const formatedDated = new Date(note.created_at).toLocaleDateString("en-US")
    return <div className="note-container">
                <p className="note-title">{note.title}</p>
                <p className="note-context">{note.context}</p>
                <p className="note-date">{formatedDated}</p>
                <button className="delete-button" onClick={() => onDelete(note.id)}>Delete</button>

                
            </div>

}

export default Note