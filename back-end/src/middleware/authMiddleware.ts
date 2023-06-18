import { Request, Response, NextFunction } from 'express';

interface Roles {
    student?: boolean,
    teacher?: boolean,
    admin?: boolean,
}

const auth = (role: Roles) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    if ( (role.student && !req.session.user.student)
        || (role.teacher && !req.session.user.teacher)
        || (role.admin && !req.session.user.admin)
    ) {
        res.status(403).json({ message: 'Forbidden' });
        return;
    }
    next();
}

export default auth;
