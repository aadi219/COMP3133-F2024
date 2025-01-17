const fs = require('fs')

function deleteIfExists(file) {
    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
    }
}

deleteIfExists("canada.txt");
deleteIfExists("usa.txt");

try {
    const data = fs.readFileSync("./input_countries.csv", "utf-8");
    dataArr = data.split("\r\n");
    canadaData = [];
    usaData = [];
    
    dataArr.forEach(row => {
        cols = row.split(",")
        if (cols[0] == "Canada") {
            canadaData.push(row)
        }
        else if (cols[0] == "United States") {
            usaData.push(row)
        }
    });  

    fs.writeFileSync("canada.txt", canadaData.join("\n"))
    fs.writeFileSync("usa.txt", usaData.join("\n"))
} catch(err) {
    console.error(err);
}



