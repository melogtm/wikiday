
# WikiDay

Allows users to get an important events in history - based on month and day - through a simple and interactive interface. 


## Screenshots

![App Screenshot](https://raw.githubusercontent.com/melogtm/wikiday/main/client/public/image/preview.png)


## Documentation for api/

Open your terminal, go to api/ and install the dependencies with

```
npm i
```

Then, you want to start the index.js to run the api on port `9000`: 

```
npm start
```

### API Usage 

`/` - Return an random event using today as reference. 

`/event` - Same as `/`.

`/birth` - Return a random birth using today as reference. 

`/death` - Return a random death using today as reference. 

`/:type/+date` - Return your selected type based on the date on params e.g. `/death/xxxx-02-01` will return a random death that ocurr on February 1. 



## Installation

Start by installing the dependencies for both client and api

```bash
# client/

npm i 

# api/

npm i 
```

After that, start the api by going in the folder and

```
npm start 
```

Do the same for client

```
npm start
```

It will open `localhost:PORT` automatically for you!
## Lessons Learned

API Integration with React and pure-CSS, besides applying a basic routing with `react-dom-router`. 


## License

[MIT](https://github.com/melogtm/wikiday/blob/main/LICENSE)

