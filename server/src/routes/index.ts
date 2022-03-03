import express, { Response, Request, NextFunction } from 'express';

let router = express.Router();

router.get('/', function(_req : Request, res : Response, _next: NextFunction) {
  res.render('index', { title: 'Pokemon App' });
});

export default router;