const express = require('express')
const bp = require('body-parser')

const app = express()

const PORT = 3002;

app.use(bp.json())
app.use(bp.urlencoded({extended:false}))

// create 3 users - name, age, city, username, password
const users = [
    {name: "Dan", age: 20, city: "Beer-Sheva", username: "Dan20", password: "d12345"},
    {name: "Ben", age: 21, city: "Ashdod", username: "555ben", password: "b12345"},
    {name: "Gal", age: 33, city: "Netivot", username: "Gal123", password: "g12345"}
]

let products = [
    {productName: "Pizza", price: 20},
    {productName: "Burger", price: 30},
    {productName: "Milksheak", price: 10}
]

app.get('/', (req, res)=>{
    res.send("works 2")
})

app.get('/api', (req, res)=>{
    res.json({message: "Message from server!"})
})

app.get('/api/users', (req, res)=>{
    res.json(users)
})

app.get('/api/menu-products', (req, res)=>{
    res.json(products)
})

app.post('/api/add-product', (req, res)=>{
    console.log(req.body)
    products.push(req.body)
    // get data from req
    // save in products
    // res status 200
    res.json(products)
    res.json({ res: false, message: "user not found" })
})


// check login details
app.post('/login', (req, res)=>{
    // get the values from req body
    let uDetails = req.body
    // compare with the db (local array)
    let resUser = users.filter((user) => user.username == uDetails.uName && user.password == uDetails.uPass)
    console.log(resUser);
    let result;
    if(resUser.length > 0) {
        result = { isLogin: true, message: "User login" }
    } else {
        result = { isLogin: false, message: "User NOT login" }
    }
    // return result
    res.json(result)
})


app.listen(PORT, ()=>console.log(`Server listen on port ${PORT}`))