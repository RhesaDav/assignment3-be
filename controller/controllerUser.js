const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

class userController {
    static findUser = async (req, res, next) => {
        try {
            const result = await User.find();
            if (result === null ) {
                throw {name: 'NOT_FOUND'}
            } else {
                res.status(200).json({ message: "User Found", result})
            }
        } catch (error) {
            next(error)
        }
    }

    // static createUser = async (req, res, next) => {
    //     try {
    //         const result = await User.create({
    //             nama: req.body.nama,
    //             email: req.body.email,
    //             password: req.body.password
    //         })
    //         res.status(200).json({message: "User Created", result})
    //     } catch (error) {
    //         next({message: "gagal om"})
    //     }
    // }

    static registerUser = (req, res, next) => {
        bcrypt.hash(req.body.password, 10, function(err, hashedPass){
            if(err){
                res.json({ error:err })
            }
            const user = new User ({
                nama: req.body.nama,
                email: req.body.email,
                password: hashedPass
            }) 
    
            user.save()
            .then(user => {
                res.json({ message: "Regist Success"})
            })
            .catch(error => {
                res.json({ message: "Regist gagal"})
            })
        })
    }

    static deleteUser = async (req, res, next) => {
        const { id } = req.params
        try {
            const result = await User.findByIdAndDelete(id)
            if (result === null) {
                throw{message: "gagal"}
            } else {
            res.status(200).json({message: "User Deleted", data: result})
            }
        } catch(error) {
            next(error)
        }
    }

    static loginUser = async (req, res, next) => {
        const { email, password } = req.body
        
        User.findOne({$or: [{email:email}]})
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function(err, result) {
                    if (err) {
                        res.json({error: err})
                    } if(result){
                        const token = jwt.sign({email: user.email}, 'verySecretValue', {expiresIn: '3h'})
                        res.json({ messsage: 'login sukses', token})
                        } else{
                            res.json({ message: 'password tidak cocok'})
                        }
                    }              
                )
            } else {
                res.json({ message: "User tidak ditemukan"})
            }
        }
        )}

    // static loginUser = async (req, res, next) => {
    //     try{
    //         const { nama, password } = req.body
    //         console.log(req.body)
    //         const User = await User.findOne({nama}).lean();
    //         console.log(User)
    //         if (!User) {
    //             throw {name: "INVALID_USERNAME"}
    //         }

    //         if (await compare(password, User.password)){
    //             const token = sign(
    //                 {
    //                     id: User._id,
    //                     nama: User.nama,
    //                     email: User.email
    //                 }
    //             )
    //             console.log(token)
    //             return res.status(200).json({
    //                 status: "berhasil login",
    //                 data: token
    //             })
    //         } else {
    //             throw { name: "INVALID_PASSWORD"}
    //         }
    // } catch (error) {
    //     next(error)
    // }
    // }

}

module.exports = userController