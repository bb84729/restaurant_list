const express = require ('express')
const app = express()
const port = 3000
// require express-handlebars here
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant .json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//routes setting
app.get('/',(req,res)=>{
  

  // past the movie data into 'index' partial template
  res.render('index', { restaurants: restaurantList.results})
  console.log(restaurantList.results)
})
//show route
app.get('/restaurants/:restaurant_id', (req, res) =>
{
  const restaurant = restaurantList.results.filter(restaurant => restaurant.id == req.params.restaurant_id)
  res.render('show', { restaurant: restaurant[0] })
})
//search route 
app.get('/search', (req, res) =>
{
  console.log(req.query)
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant =>{
    return restaurant.name.includes(keyword)
  })
  console.log(restaurants)
  res.render('index', { restaurants: restaurants })
})
// setting static files
app.use(express.static('public'))



// start and listen on the Express server
app.listen(port, () =>
{
  console.log(`Express is listening on localhost:${port}`)
})