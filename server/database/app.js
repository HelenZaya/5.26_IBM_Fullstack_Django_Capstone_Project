const express = require('express');
const cors = require('cors');
const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());

const dealers = [
    { id: 1, full_name: 'Sunshine Toyota', city: 'Chicago', state: 'Illinois', zip: '60601', address: '1234 Lake Shore Dr', rating: 4.8 },
    { id: 2, full_name: 'Midwest Motors Ford', city: 'Springfield', state: 'Illinois', zip: '62701', address: '567 Capitol Ave', rating: 4.5 },
    { id: 3, full_name: 'Prairie Honda', city: 'Naperville', state: 'Illinois', zip: '60540', address: '890 Aurora Ave', rating: 4.7 },
    { id: 4, full_name: 'Great Plains Chevrolet', city: 'Wichita', state: 'Kansas', zip: '67201', address: '321 Main St', rating: 4.6 },
    { id: 5, full_name: 'Sunflower BMW', city: 'Overland Park', state: 'Kansas', zip: '66210', address: '456 College Blvd', rating: 4.9 },
    { id: 6, full_name: 'Heartland Toyota', city: 'Topeka', state: 'Kansas', zip: '66601', address: '789 Washburn Ave', rating: 4.4 },
    { id: 7, full_name: 'Lone Star Ford', city: 'Houston', state: 'Texas', zip: '77001', address: '100 Main St', rating: 4.7 },
    { id: 8, full_name: 'Bayou Honda', city: 'Dallas', state: 'Texas', zip: '75201', address: '200 Commerce St', rating: 4.5 },
    { id: 9, full_name: 'Pacific Honda', city: 'Los Angeles', state: 'California', zip: '90001', address: '300 Wilshire Blvd', rating: 4.6 },
    { id: 10, full_name: 'Golden Gate Toyota', city: 'San Francisco', state: 'California', zip: '94102', address: '400 Market St', rating: 4.8 },
];

const reviews = [
    { id: 1, dealership: 1, name: 'John Smith', review: 'Fantastic service! The staff was very helpful and I got a great deal.', purchase_date: '2023-06-15', car_make: 'Toyota', car_model: 'Camry', car_year: 2023, purchase: true },
    { id: 2, dealership: 1, name: 'Emily Johnson', review: 'Great experience overall. Would definitely recommend to friends.', purchase_date: '2023-08-20', car_make: 'Toyota', car_model: 'RAV4', car_year: 2023, purchase: true },
    { id: 3, dealership: 2, name: 'Michael Davis', review: 'The salesperson was pushy and the wait time was long.', purchase_date: '2023-05-10', car_make: 'Ford', car_model: 'Explorer', car_year: 2022, purchase: true },
    { id: 4, dealership: 3, name: 'Sarah Wilson', review: 'Outstanding customer service. Very professional team!', purchase_date: '2023-09-05', car_make: 'Honda', car_model: 'Civic', car_year: 2023, purchase: true },
    { id: 5, dealership: 4, name: 'Robert Brown', review: 'Good prices and friendly staff. Happy with my purchase.', purchase_date: '2023-07-22', car_make: 'Chevrolet', car_model: 'Tahoe', car_year: 2023, purchase: true },
    { id: 6, dealership: 5, name: 'Lisa Anderson', review: 'Excellent dealership! The BMW X5 I bought is perfect.', purchase_date: '2023-10-01', car_make: 'BMW', car_model: 'X5', car_year: 2023, purchase: true },
];

let nextReviewId = 7;

app.get('/fetchDealers', (req, res) => {
    res.json(dealers);
});

app.get('/fetchDealers/:state', (req, res) => {
    const state = req.params.state;
    const filtered = dealers.filter(d => d.state.toLowerCase() === state.toLowerCase());
    res.json(filtered);
});

app.get('/fetchDealer/:id', (req, res) => {
    const dealer = dealers.find(d => d.id === parseInt(req.params.id));
    if (dealer) res.json(dealer);
    else res.status(404).json({ error: 'Dealer not found' });
});

app.get('/fetchReviews/dealer/:id', (req, res) => {
    const dealerReviews = reviews.filter(r => r.dealership === parseInt(req.params.id));
    res.json(dealerReviews);
});

app.post('/insert_review', (req, res) => {
    const review = { id: nextReviewId++, ...req.body };
    reviews.push(review);
    res.json({ status: 200, message: 'Review added successfully', review });
});

app.listen(port, () => {
    console.log(`Dealer database service running on port ${port}`);
});
