const express = require('express');
const { Mongoose } = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/know-more', {
	useFindAndModify: false,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
app.use(require('./routes'));
//Use this to log mongo queries being executed
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
