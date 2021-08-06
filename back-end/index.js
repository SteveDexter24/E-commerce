const app = require('./app')

let port = process.env.PORT
if (port == null || port == '') {
  port = 3001
}

app.listen(port, () => {
  console.log('Server has started successfully')
})
