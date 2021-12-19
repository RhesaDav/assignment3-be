const express = require('express')
const upload = require('../middlewares/file')

const router = express.Router()
const userController = require('../controller/controllerUser')
const productController = require('../controller/controllerProduct')

router.get('/user', userController.findUser)
router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.delete('/user/:id', userController.deleteUser)

router.get('/product', productController.findProduct)
router.post('/product', upload.single('gambar'), productController.createProduct)
router.delete('/product/:id', productController.deleteProduct)



module.exports = router