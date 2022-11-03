const { app } = require("./app");

app.listen((process.env.PORT || 300), console.log(`App listening on port ${process.env.PORT}`))