import React from "react"


export default function Die(props){

    const styles = {
        backgroundColor: props.obj.isHeld ? "#ae95f6" : "white"
    }

    return (
        <div style={styles} onClick={()=>props.onChange(props.obj.id)} className="Die">
            <div className="num">{props.obj.value}</div>
        </div>
    )
}
