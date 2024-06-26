import jwt from 'jsonwebtoken';
import authenticate from '../src/middleware/authMiddleware';

jest.mock('jsonwebtoken');

describe('authenticate middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            header: jest.fn(),
        };
        res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    it('should return 401 if no token is provided', () => {
        req.header.mockReturnValue(null);

        authenticate(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: 'No token, authorization denied',
        });
    });

    it('should return 401 if token is invalid', () => {
        req.header.mockReturnValue('Bearer invalidtoken');
        jwt.verify.mockImplementation(() => {
            throw new Error('Token is not valid');
        });

        authenticate(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Token is not valid',
        });
    });

    it('should call next if token is valid', () => {
        req.header.mockReturnValue('Bearer validtoken');
        const decoded = { user: { id: 'user1' } };
        jwt.verify.mockReturnValue(decoded);

        authenticate(req, res, next);

        expect(jwt.verify).toHaveBeenCalledWith(
            'validtoken',
            process.env.JWT_SECRET,
        );
        expect(req.user).toEqual(decoded.user);
        expect(next).toHaveBeenCalled();
    });
});
