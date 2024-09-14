import express from "express";

//init app
const PORT = process.env.PORT || 4000;
const app = express();

app.get('/', (req, res) => res.send('<h1>Hii Hassan!</h1>'));

app.listen(PORT, () => console.log(`app is up and running on port ${PORT}`));
