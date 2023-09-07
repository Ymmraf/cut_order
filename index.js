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

app.get('/success', (req,res) => {
    res.render('cut_order_redirect')
})

app.post("/submit-order", (req, res) => {
  let textMessage;
  let customerInfo = `
ชื่อ : ${req.body.name}
เบอร์ : ${req.body.phone}
ไลน์ : ${req.body.line}
วันมารับ : ${req.body.pickupDate}
เวลามารับ : ${req.body.pickupTime}\n
`;
  let orderInfo = ``;
  for (let i = 0; i < (req.body.glass).length; i++) {
    orderInfo += `${req.body.glass[i]} - ${req.body.size[i]} - ${req.body.quantity[i]} \n`;
  }
  textMessage = customerInfo + orderInfo;
  const options = {
    method: "POST",
    url: "https://notify-api.line.me/api/notify",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer EJH870n6DikXhkaAkl7o0ALfeHEkDfrLYEmmnkOdNUQ",
    },
    form: { message: textMessage },
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
  res.redirect("/success");
});

app.listen(port, () => {
    console.log('Server start!')
})