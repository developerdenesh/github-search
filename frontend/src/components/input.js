import React, { useState } from "react";
import { Input } from "@chakra-ui/react";
import axios from "axios";


const Searchinput = () => {
    const [value, setValue] = useState("")

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            // TODO: make this a component
            let formData = {
                body: "name",
                type: "user"
            }
    
            axios({

                // Endpoint to send files
                url: "http://localhost:5000/search",
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                    'Access-Control-Allow-Credentials': true
                },

                // Attaching the form data
                data: JSON.stringify(formData),
            })
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.error(err)
                });
        }
        console.log("enter")
    }


    return (
        <Input
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter the search query"
            size='lg'
        />
    )
}

export default Searchinput;
