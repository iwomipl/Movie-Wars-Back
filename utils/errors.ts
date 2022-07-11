import {NextFunction, Request, Response} from "express";

export class ValidationError extends Error {
}

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(err);

    if (req.headers["content-type"] === 'application/json') {
        res.status(err instanceof ValidationError ? 400 : 500)
            .json({
                message: err instanceof ValidationError ? err.message : `We're sorry, try again later.`,
            });
        return;
    }
}

export const handleFourOhFourError = (req: Request, res: Response, next: NextFunction): void => {

    res.status(404)
        .json({error: 'Not found'});
}