import {
  RequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';

export interface CustomParamsDictionary {
  [key: string]: any;
}

const catchAsync =
  (
    fn: RequestHandler<
      CustomParamsDictionary,
      any,
      any,
      qs.ParsedQs,
      Record<string, any>
    >,
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };

export default catchAsync;
