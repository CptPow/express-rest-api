const express = require("express");
const app = express();
const PORT = 3000;


app.use("/posts", require("./routes/router"))


app.listen(PORT, () => {
    console.log(`Server in ascolto su porta ${PORT}`);
});
