if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())

mongoose.connect(process.env.MongoDB_URI, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('Connected to dabase')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('Listening for request')
})
