const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: 'Home'});
});

app.listen(port, () => {
    console.log(`Rest API listening at http://localhost:${port}`)
});

let fruits = [
    {"id": 1,"title": "Apple"},
    {"id": 2,"title": "Banana"},
    {"id": 3,"title": "Grapefruit"},
    {"id": 4,"title": "Grapes"}
];

app.get("/fruits", (req, res) => {
    res.json(fruits);
});
const findFruitById = (id) => {
    return Object.values(fruits).find(fruit => fruit.id === id);
}

app.get("/fruits/:id", (req, res) => {
    var id = parseInt(req.params.id);
    if(!isNaN(id)){
        var fruit = findFruitById(id);
        if(fruit !== null && fruit !==undefined)
            res.json(findFruitById(id));
        else
            res.json({ message: "No fruit was found with that id."});  
    } else {
        res.json({ error: "Id parameter should be a number."});
    }   
});

app.post("/fruits", (req, res) => {

    if(req.body.id){

        var id = parseInt(req.body.id);

        if(!isNaN(id)){

            var fruit = findFruitById(id);

            if(fruit !== null && fruit !==undefined){
                res.json({ message: "This fruit id already exists."}); 
            }
            else {
                fruits.push(req.body);
                res.json({ message: "Fruit was added."});
            }
        } else {
            res.json({ error: "Id parameter should be a number."});
        }   
    } else {
        res.json({ error: "Id is missing in the POST request."});
    }  
});

const modifyFruitById = (id, updatedFruit) => {
    fruits.find(function(fruit, i){
        if(fruit.id === id){
            fruits[i] =  updatedFruit;
        }
    });
};

app.put("/fruits", (req, res) => {

    if(req.body.id){

        var id = parseInt(req.body.id);

        if(!isNaN(id)){

            var fruit = findFruitById(id);

            if(fruit !== null){
                modifyFruitById(id, req.body)
                res.json({ message: "Fruit was modified."});  
            }
            else {
                res.json({ message: "Fruit doesn't exist."}); 
            }
        } else {
            res.json({ error: "Id parameter should be a number."});
        }   
    } else {
        res.json({ error: "Id is missing in the PUT request."});
    }  
});