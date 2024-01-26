const fs = require("fs");

const sleep = ms => {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

const fsData = fs.readFileSync("./example.txt", "utf-8");
console.log("First READ: ", fsData);

console.log("Adding some log to see async behaviour!!");

fs.readFile("./example.txt", "utf-8", async (err, data) => {
    
    await sleep(5000);
    
    if (err) {
        console.log("Some error occurred, READFILE");
        return;
    }

    console.log("SECOND Read: ", data);
})

console.log("Adding some log to see async behaviour!!");