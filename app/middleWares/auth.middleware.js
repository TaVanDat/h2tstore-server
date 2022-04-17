// exports.authenToken = (req, res, next) => {
//     //'Bearer [token]'
//     try {
//         const token = req.headers?.authorization?.split(' ')[1]
//         if (!token) { res.sendStatus(401); return }
//         jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
//             if (err) res.sendStatus(403)
//             req.data = data
//             next();
//         })
//     } catch (error) {
//         res.sendStatus(403)
//     }
// }