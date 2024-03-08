const express = require("express");
const app = express();

require("dotenv").config();
const dbConfig = require("./config/dbConfig.js");
var cors = require("cors");
app.use(cors());
app.use(express.json());
const userRoute = require("./routes/userRoute.js");
const artistRoute = require("./routes/artistRoute.js"); // corrected the spelling of 'artistRoute.js'
const imagesRoute = require("./routes/imagesRoute.js");
const moviesRoute = require("./routes/moviesRoutes.js");
const reviewRoute = require("./routes/reviewRoute.js");
const filtersRoute = require("./routes/filtersRoute.js");
app.use("/api/users", userRoute);
app.use("/api/artists", artistRoute);
app.use("/api/images", imagesRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/movies", reviewRoute);
app.use("/api/filters", filtersRoute);
const port = process.env.PORT || 5000;
const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}
app.listen(port, () => console.log(`Server started on port ${port}`)); // corrected the console.log to properly display the port number
