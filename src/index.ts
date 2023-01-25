import express, { Express, Request, Response } from 'express';
import path from 'path'
import axios from 'axios';

// Using the express backend library
const app: Express = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// This is required to make forms work
app.use(express.json())

const PORT = process.env.PORT || 3000

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
    console.log(body)

    let result: string[] = [];

    axios.get<any>(`https://api.github.com/search/repositories?q=${body}`,
        {
            headers: {
                Accept: 'application/vnd.github.text-match+json',
            },
        },
    ).then((response) => {
        console.log(response.status)
        const data: Array<any> = response.data.items;
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].html_url)
            result.push(data[i].html_url)
        }
        res.send(result).status(200);
    }).catch((error) => {
        console.error("Error with the url")
        console.error(error)
        res.send(error).status(503)
    })
    
});

// ====================
// This is the listening for the localhost
// ====================
app.listen(PORT, () => {
    // NO SSL at the moment
    console.log(`⚡️⚡️⚡️ Server is running at http://localhost:${PORT}`);
});
