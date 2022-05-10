import * as express from 'express';
import {join} from 'path';

const app = express();

app.use(express.static(join(__dirname, '../public')));

app.get('/notes', (req, res) => {
  console.log(req.query);

  res.send({
    notes: [
      {
        title: 'Blue note',
        body: 'This is a blue note',
        color: 'blue',
      },
      {
        title: 'Yellow note',
        body: 'This is a yellow note',
        color: 'yellow',
      },
    ],
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});