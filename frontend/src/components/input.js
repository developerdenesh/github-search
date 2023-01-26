import React, { useState, useEffect } from "react";
import { Input, ListItem, ListIcon, List, Radio, RadioGroup, Stack, Spinner } from "@chakra-ui/react";
import { StarIcon } from '@chakra-ui/icons'
import axios from "axios";

const Searchinput = () => {
    const [value, setValue] = useState("")
    const [keyword, setKeyword] = useState("users")
    const [apitimer, setapitimer] = useState(null)
    const [urllist, setUrllist] = useState([])
    const [placeholdertext, setPlaceholdertext] = useState("Enter the search query")
    const [displayspinner, setDisplayspinner] = useState(false)

    useEffect(() => {
        setapitimer(
            setTimeout(() => {
                console.log("timer initialised")
            }, 1000)
        )
    }, [])


    useEffect(() => {
        if (keyword === "issues") {
            setPlaceholdertext("windows+label:bug+language:python+state:open&sort=created&order=asc")
        } else if (keyword === "repositories") {
            setPlaceholdertext("typescript-twilio")
        } else if (keyword === "topics") {
            setPlaceholdertext("typescript")
        } else if (keyword === "labels") {
            setPlaceholdertext("bug+defect+enhancement&repository_id=64778136")
        } else if (keyword === "commits") {
            setPlaceholdertext("q=repo:developerdenesh/typescript-twilio+css")
        } else if (keyword === "code") {
            setPlaceholdertext("q=addClass+in:file+language:js+repo:jquery/jquery")
        } else if (keyword === "users") {
            setPlaceholdertext("developerdenesh")
        }

        // Reset the input box once the radio has been clicked
        setValue("")
        setUrllist([])
    }, [keyword])


    const callApiManager = ({ query }) => {
        // It is not caputuring the last letter
        clearTimeout(apitimer)

        setapitimer(
            setTimeout(() => {
                // Clear the text field when a new suggestion is being queried
                setUrllist([])
                callApi({ query: query })
            }, 1000)
        )
    }

    const callApi = ({ query }) => {
        const data = {
            query: query,
            type: keyword
        }

        setDisplayspinner(true)
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
                    let temp_json;
                    if (keyword === "topics" || keyword === "code") {
                        console.log(element)
                        temp_json = {
                            id: element.url,
                            url: element.url,
                        }
                    } else {
                        temp_json = {
                            id: element.id,
                            url: element.url,
                        }
                    }
                    // Display data on the screen
                    setUrllist(urllist => [...urllist, temp_json])
                    return 0;
                })
                
                setDisplayspinner(false)
                console.log(urllist)

            })
            .catch((err) => {
                setDisplayspinner(false)
                console.log(err);
            });
    }

    const handleChange = (event) => {
        console.log(event.target.value)

        // This seems to lag such that the api call is unable to use value
        setValue(event.target.value)
        callApiManager({ query: event.target.value })
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 39) {
            setValue(placeholdertext)
            callApiManager({ query: placeholdertext })
        }
    }


    return (
        <>
            <RadioGroup onChange={setKeyword} value={keyword}>
                <Stack direction='row'>
                    <Radio value='code'>Code</Radio>
                    <Radio value='commits'>Commits</Radio>
                    <Radio value='issues'>Issues and Pull Requests</Radio>
                    <Radio value='labels'>Labels</Radio>
                    <Radio value='repositories'>Repositories</Radio>
                    <Radio value='topics'>Topics</Radio>
                    <Radio value='users'>Users</Radio>
                </Stack>
            </RadioGroup>

            <Input
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholdertext}
                className="search-bar"
                size='lg'
            />

            {displayspinner ? <Spinner color='red.500' /> : <></>}

            <List>
                {urllist.map((item) => (
                    <ListItem key={item.id} width={1100}>
                        <ListIcon as={StarIcon} color='green.500' />
                        {item.url}
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default Searchinput;
