const express = require('express');
const router = express.Router();
const getUser = require('../Controllers/user.controller')
// const authenToken = require('../middleWares/auth.middleware')

// function authenToken(req, res, next) {
//     //'Bearer [token]'
//     try {
//         const token = req.headers?.authorization?.split(' ')[1]
//         if (!token) { res.sendStatus(401); return }
//         jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
//             if (err) res.sendStatus(403)
//             next();
//         })
//     } catch (error) {
//         res.sendStatus(403)
//     }
// }

router.get('/user-list', getUser.getUser)
router.get('/:id', getUser.userId)
router.put('/update', getUser.checkLogin, getUser.updateUser)
module.exports = router