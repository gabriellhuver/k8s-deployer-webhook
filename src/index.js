const express = require('express');
const cors = require('cors');
const k8s = require('./lib/k8s')
const app = express();

app.use(express.json());

app.use(cors());

const masterToken = process.env.TOKEN || 'token';

app.post("/webhook", (req, res)=>{

    const { DeployToken } = req.headers;
    
    if(!isValid(DeployToken)) res.status(403).send()

    k8s.deploy(req.body)

    res.status(200).json({ok: true})
});

function isValid(token){
    return token === masterToken;
}

const port = process.env.PORT || 3000

app.listen(port, ()=> {
    console.log('app listen on port ' + port)
});