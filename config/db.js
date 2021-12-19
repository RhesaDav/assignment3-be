const mongoose = require('mongoose')

function dbAssign () {
    main().catch((err) => console.log(err))
    async function main() {
        await mongoose.connect("mongodb://localhost:27017/dbAssign")
        console.log("db connect")
    }
}

module.exports = dbAssign