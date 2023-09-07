const express = require('express')
const request = require('request')
const app = express()
const hbs = require('hbs')
const { MongoClient } = require('mongodb')
const port = 3000
const uri = "mongodb://localhost:27017"

app.use(express.urlencoded({ extended : true }))
app.use('/static', express.static('static'))
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')

app.get('/', (req,res) => {
    res.render('cut_order')
})

app.get('/order', (req,res) => {
    res.render('cut_order_input')
})

app.post('/submit-order', (req,res) => {
    let orderString = JSON.stringify(req.body)
    const options = {
        method: 'POST',
        url: 'https://notify-api.line.me/api/notify',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer YSzjFRj6ECNYQD88DdzYFRS1tUbdsXKkO7B6UTTZIeY'
        },
        form: {message: `
หวัดดีจ้า
นี่คือการ
ทดสอบว่า
เราจะส่งข้อ
ความโดย
ที่เว้นบรร
ทัดได้มั้ย
        `}
      };
      
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
      });
})

// app.post('/order', async(req,res) => {
//     const order = req.body
//     const client = new MongoClient(uri)
//     await client.connect()
//     await client.db('mydb').collection('order').insertOne({
//         id: parseInt(order.id),
//         type: order.glass,
//         thickness: order.thickness,
//         width: order.width,
//         height: order.height,
//         quantity: order.quantity
//     });
//     await client.close()
//     res.status(200).send({
//         "status": "ok",
//         "message": "Order has been inserted!"
//     })
// })

app.listen(port, () => {
    console.log('Server start!')
})