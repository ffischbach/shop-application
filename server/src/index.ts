import express, { Request, Response } from 'express';

const app = express();

app.get('/api', (req: Request, res: Response) => {
  res.send('hello world');
});

app.get('/api/coupon/:id', (req: Request, res: Response) => {
  const param = req.params.id;
  res.send(param);
});

app.listen(8080);
