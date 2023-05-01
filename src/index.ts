import * as dotenv from 'dotenv';
dotenv.config();
import app from './app/app';


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server start on ${PORT} port`));
