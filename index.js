'use strict'


const app = require('./app')

const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`API REST corriendo en http://localhost:${port}`)
})
