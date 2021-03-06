import {Router as ExpressRouter} from 'express';
import Users from 'Router/API/Users';
import Session from 'Router/API/Session';
import Word from 'Router/API/Word';
import Learning from 'Router/API/Learning';
import Examine from 'Router/API/Examine';
import WordBook from 'Router/API/WordBook';
import Using from 'Router/API/Using';

class API extends ExpressRouter {
  constructor() {
    super();
    this.use('/user', Users);
    this.use('/session', Session);
    this.use('/word', Word);
    this.use('/learning', Learning);
    this.use('/examine', Examine);
    this.use('/wordbook', WordBook);
    this.use('/using', Using);
    this.use(API.handleValidationError);
  }

  static handleValidationError(err, req, res, next) {
    if (err.name === 'ValidationError') {
      return res.status(422).json({
        errors: Object.keys(err.errors).reduce((errors, key) => {
          errors[key] = err.errors[key].message;
          return errors;
        }, {}),
      });
    }
    return next(err);
  }
}

export default new API();
