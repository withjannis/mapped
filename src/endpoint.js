//simple nodejs express api endpoint

const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config(); 
const port = process.env.NODE_ENDPOINT_PORT;

app.get('/', (req, res) => {
    res.send('Hello from Express!')
});

app.post('/json', function(request, response){
  console.log(request.body);      // your JSON
   response.send(request.body);    // echo the result back
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
