const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

const authHeader = req.get('Authorization')
console.log('authHeader', authHeader)
if(!authHeader){
    req.isAuth = false
    return next()
}

const token = authHeader.split(' ')[1]
let decodedToken

try {

    decodedToken = jwt.verify(token, 'itismysecretnotyours')
    console.log('decodedToken')
    
} catch (error) {
    req.isAuth = false
    return next()
}
if(!decodedToken){
    req.isAuth = false
    return next() 
}

req.userId = decodedToken.userId
req.isAuth = true
next()

} 