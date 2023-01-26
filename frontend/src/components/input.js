import React, { useState, useEffect } from "react";
import { Input, ListItem, ListIcon, List } from "@chakra-ui/react";
import { StarIcon } from '@chakra-ui/icons'
import axios from "axios";

const Searchinput = () => {
    const [value, setValue] = useState("")
    const [apitimer, setapitimer] = useState(null)
    const [urllist, setUrllist] = useState([])

    useEffect(() => {
        setapitimer(
            setTimeout(() => {
                console.log("timer initialised")
            }, 1000)
        )
    }, [])

    const callApi = ({ query }) => {
        const data = {
            query: query,
            type: "repositories"
        }

        axios({
            // Endpoint to send files
            url: "http://localhost:5000/search",
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },

            // Attaching the form data
            data: data,
        })
            .then((res) => {
                console.log(res.data)
                res.data.map((element) => {
                    let temp_json = {
                        id: element.id,
                        url: element.url,
                    }
                    // Display data on the screen
                    setUrllist(urllist => [...urllist, temp_json])
                    return 0;
                })

            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleChange = (event) => {
        console.log(event.target.value)

        // This seems to lag such that the api call is unable to use value
        setValue(event.target.value)

        // It is not caputuring the last letter
        clearTimeout(apitimer)

        setapitimer(
            setTimeout(() => {
                // Clear the text field when a new suggestion is being queried
                setUrllist([])
                callApi({ query: event.target.value })
            }, 1000)
        )
    }

    const handleKeyDown = (event) => {
        // const keycode = event.keyCode
        // if (event.key === "Enter") {
        //     return;
        // }

        // let temp_value = value;
        // if (event.key === "Backspace" && temp_value.length > 0) {
        //     temp_value = temp_value.slice(0, -1);
        // } else {

        //     const valid = 
        //     (keycode > 47 && keycode < 58)   || // number keys
        //     keycode === 32 || keycode === 13   || // spacebar & return key(s) (if you want to allow carriage returns)
        //     (keycode > 64 && keycode < 91)   || // letter keys
        //     (keycode > 95 && keycode < 112)  || // numpad keys
        //     (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
        //     (keycode > 218 && keycode < 223);   // [\]' (in order)

        //     if (valid) {
        //         temp_value += event.key
        //     }
        // }

        // setValue(temp_value)
        // console.log(temp_value)
    }


    return (
        <>
            <Input
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter the search query"
                size='lg'
            />
            <List>
                {urllist.map((item) => (
                    <ListItem key={item.id}>
                        <ListIcon as={StarIcon} color='green.500' />
                        {item.url}
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default Searchinput;
