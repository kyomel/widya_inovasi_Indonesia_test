const { User } = require('../models');
const response = require('../helper/response');
const bcrypt = require('bcrypt');
const token = require('../helper/token');

module.exports = {
    async register(req, res) {
       try {
       let user_instance = await User.create({
           email: req.body.email,
           password: req.body.password,
           name: req.body.name,
           jenis_kelamin: req.body.jenis_kelamin
       })
            return res.status(201).json(response.success('Successfuly registered!', {user_instance}))
       }
       catch (err) {
            return res.status(400).json(response.error('Registered Failed!', err.message))
       }
    },

    async login(req, res) {
        try {
            let instance = await User.findOne({
                where: {
                    email: req.body.email.toLowerCase()
                }
            })
            if(!instance) {
                throw new Error(`Email ${req.body.email} doesn't exist!`)
            }
            const isPasswordTrue = await bcrypt.compareSync(req.body.password, instance.password)
            if(!isPasswordTrue){
                throw new Error(`Wrong Password!`)
            }
            return res.status(201).json(response.success('Successfully login', { token: token(instance), User: instance}))
        }
        catch (err) {
            return res.status(400).json(response.error('Register Failed!', err.message))
        }
    },

    async profile(req, res){
        let result = await User.findOne({
            where: {
                id: req.User.id
            },
            attributes: ['id', 'email', 'name', 'jenis_kelamin']
        })
        return res.status(201).json(response.success(`This account is active`, {Result: result}))
    }
}