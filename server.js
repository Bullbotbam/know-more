const express = require('express');
const { Mongoose } = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || '', {
	// useFindAndModify: false,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

//Use this to log mongo queries being executed
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
