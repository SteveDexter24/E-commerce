const app = require('./app')

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(
    `Server has started successfully in ${process.env.NODE_ENV} mode at port ${PORT}`,
  )
})
