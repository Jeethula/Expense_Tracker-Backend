const express = require("express");
const fs = require("fs");

const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

mongoose.connect(
    `mongodb://localhost:27017`, 
    {
        dbName: "expense-tracker"
    }
).then(() => {
    console.log("Successfully connected to MongoDB");
})
.catch(error => {
    console.log("Error connecting to MongoDB", error);
})

app.use(bodyParser.json());
app.use(cors());

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// })

const ExpenseModel = mongoose.model('expenses', {
    title: String,
    description: String,
    amount: Number,
    type: Number,
    date: String
});


app.get("/expenses", async (req, res) => {
    const data = await ExpenseModel.find();
    return res.send(data);
    // fs.readFile("./data.json", "utf-8", (err, data) => {
    //     // console.log(data);
    //     res.send(data);
    // })
})

app.get("/expenses/:id", async (req, res) => {

    const data = await ExpenseModel.findById(req.params.id);
    return res.send(data);

    // fs.readFile("./data.json", "utf-8", (err, data) => {
    //     let formattedData = JSON.parse(data);
    //     // let formattedData = JSON.stringify(data);
    //     let item = formattedData.find(element => element.id === parseInt(req.params.id));
        
    //     if (!item) {
    //         res.status(404);
    //         return res.send({ message: "Data not exist" });
    //     }

    //     res.send(item);
    // })
})

app.post("/expenses", async (req, res) => {
    const payload = req.body;
    console.log(payload);

    const expense = new ExpenseModel(payload);
    const item = await expense.save();

    console.log("POST OPERATION, ITEM: ", item);

    res.send({ message: "SUCCESS" }).status(200)
})

app.put("/expenses/:id", async (req, res) => {
    const payload = req.body;
    const id = req.params.id;
    console.log("PUT API: ", payload, id);

    const item = await ExpenseModel.findByIdAndUpdate(id, payload);
    console.log(item);

    res.send({ message: "SUCCESS" }).status(200)
})

app.delete("/expenses/:id", async (req, res) => {
    const id = req.params.id;
    console.log(`Data to be deleted: ${id}`);

    const item = await ExpenseModel.findByIdAndDelete(id);
    console.log(item);

    res.send({ message: "SUCCESS" })
})


const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Connected to the server on PORT: ${PORT}`);
});