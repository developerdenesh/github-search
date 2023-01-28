import express, { Express, Request, Response } from 'express';
import path from 'path'
import axios from 'axios';
import cors from 'cors';

// Using the express backend library
const app: Express = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// This is required to make forms work
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000

// ====================
// These are the views
// ====================
app.get('/', (req: Request, res: Response) => {
    // res.send("hello");
    res.render(path.join(__dirname, '../views/index'), {
        title: "Search",
    });
});

// ====================
// These are the API endpoints
// ====================
app.post('/search', (req: Request, res: Response) => {
    const body: string = req.body.query;
    const type_search: string = req.body.type;
    console.log(body)

    let result: Object[] = [];
    axios.get<any>(`https://api.github.com/search/${type_search}?q=${body}`,
        {
            headers: {
                Accept: 'application/vnd.github.text-match+json',
            }
        }
    )
    .then((response) => {
        console.log(response.status)
        const data: Array<any> = response.data.items;
        for (let i = 0; i < data.length; i++) {
            console.log(data[i])
            
            let temp_json;

            if (type_search === "topics") {
                temp_json = {
                    id: data[i].name,
                    url: data[i].name
                }
            } else {
                temp_json = {
                    id: data[i].id,
                    url: data[i].html_url
                }
            }
            result.push(temp_json)
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.send(result).status(200);
    })
    .catch((error) => {
        console.error("Error with the url")
        console.error(error)
        res.header("Access-Control-Allow-Origin", "*");
        res.send(error).status(503)
    })
});

// ====================
// This is the listening for the localhost
// ====================
app.listen(PORT, () => {
    // NO SSL at the moment
    console.log(`⚡️⚡️⚡️ Server is running at http://localhost:${PORT}`);

    // Keep the backend server alive by performing an activity every 5 minutes
    setInterval(() => {
        const a: number = 3;
        const b: number = 5;
        const sum: number = a + b;
    }, 300000);
});

module.exports = app
