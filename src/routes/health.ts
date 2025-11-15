import {Router, Request, Response} from 'express';
const router = Router();

router.get('/', async (req: Request, res: Response) => {
  // return version and uptime
  const version = process.env.npm_package_version || '0.0.0';
  res.json({
    status: 'ok',
    version,
    uptime: process.uptime()
  });
});

export default router;
