/* 
    Rutas de usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const router = Router();

const { createUser, signInUser, renewToken } = require('../controllers/auth');

router.post('/new', createUser);

router.post('/', signInUser);

router.get('/renew', renewToken);

module.exports = router;
