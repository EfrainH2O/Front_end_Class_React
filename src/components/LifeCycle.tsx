import React, {useEffect, useState} from  "react"

const LifeCycle = () =>{
    const [text, setText] = useState("")
    //before start => component did mount
    useEffect(()=>{
        console.log("Antes de nada, buenos dias")
    },[])
    //update every time the text update -> update after update
    useEffect(()=>{
        console.log("Cambiaste el texto")
    },[text])
    //when it dies
    useEffect(()=>{
        return () => console.log("Componente matado")
    },[])
    //cuando inicia o se actualiza
    useEffect(()=>{
        console.log("always, every kind of update")
    })
    return (

        <div>LifeCycle
            <input type ="text" value={text} onChange={(e)=>setText(e.target.value)}/>
        </div>
    )
}


export default LifeCycle