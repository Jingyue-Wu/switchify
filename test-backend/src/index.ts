import { config } from 'dotenv';
config(); // load .env file

import express from 'express';
import passport from 'passport';
import authRoutes from './routes/auth';
require('./strategies/google'); // import passport strategy

const app = express();
const PORT = process.env.PORT;

app.use(passport.initialize());

// route prefix
app.use('/api/auth', authRoutes);

try {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
catch (error) {
    console.log(error);
}

