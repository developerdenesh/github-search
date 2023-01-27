import React, { useState, useEffect } from "react";

const Title = () => {
    const [title, setTitle] = useState("")
    const fulltitle = "Github Search"
    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (index < fulltitle.length) {
            setTimeout(() => {
                setTitle(title + fulltitle[index])
                setIndex(index + 1)

            }, 80)
        }
    }, [index, title, fulltitle])

    return (
        <p>
            Welcome to { title }
        </p>
    )
}

export default Title;
