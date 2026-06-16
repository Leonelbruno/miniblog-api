const { loadEnvFile } = require("node:process");

if (process.env.NODE_ENV !== "production") {
    loadEnvFile(".env");
}

const app = require("./app");
const config = require("../config/config");

const PORT = config.PORT;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});