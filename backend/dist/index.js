import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
// START -> connections and listeners
// app.listen(5000, () => console.log("Server Opened & connected to database !!!"));
const PORT = process.env.PORT || 5000;
connectToDatabase()
    .then(() => {
    app.listen(PORT, () => console.log("Server Opened & connected to database 👋"));
})
    .catch((err) => console.log(err));
// END -> connections and listene
//# sourceMappingURL=index.js.map