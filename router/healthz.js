import express from 'express';
import 'express-async-errors';
const router = express.Router();
router.get('/',(req, res, next) => {
    res.sendStatus(200);
  } );
export default router;
