# github-search
An application that allows users to use the Github API to search for keywords including Code, Commits, Issues and Pull Requests, Labels, Repositories, Topics, Users. 

Select the keyword and type in the search query into the text input. To perform a search on the default values in the search bar simply use the right arrow to autofill the search bar with the search query prompt

## Set up 
```sh
# Cloning and installation of modules
git clone https://github.com/developerdenesh/github-search
cd github-search && npm i && cd frontend && npm i
```

## Pre-requisites 
- Node v18 and above should be used for this application due to the libraries used. For UNIX systems, nvm can be used to manage the node versions with the command below
```sh
# This is to ensure node v18 and above is used (https://github.com/nvm-sh/nvm)
nvm use 18
```

## Quick start 
```sh
# Change directory to application and run the application
cd github-search

npm run dev
```

## Testing
```sh
# Run both the frontend and backend tests
npm test
```

## Future works
1. Write integration tests between the frontend and backend
2. Improve the UI to allow for better usage of the application
3. Host the fullstack application
4. Create a docker image for easier testing of the application
5. Perform CI/CD to deploy the application on pull requests to the Main branch