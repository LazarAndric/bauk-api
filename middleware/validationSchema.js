import {body, header} from 'express-validator'

const userSchema=[
    body('FirstName').isString().isLength({min:2}),
    body('LastName').isString().isLength({min:2}),
    body('PhoneNumber').isMobilePhone('sr-RS'),
    body('Email').isEmail().withMessage('Must contain e-mail'),
    body('IdStatus').isNumeric({no_symbols:true}),
    body('IdRole').isNumeric({no_symbols:true}).exists('checkNull'),
    body('Password').isStrongPassword({
        minLength: 7,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1
    }).withMessage('Password is not strong'),
    body('StreetAndNumber').isLength({min:4})
]

const userEditSchema=[
    header('Authorization').contains('Barear '),
    body('FirstName').isString().isLength({min:2}),
    body('LastName').isString().isLength({min:2}),
    body('PhoneNumber').isMobilePhone('sr-RS'),
    body('Email').isEmail().withMessage('Must contain e-mail'),
    body('IdStatus').isNumeric({no_symbols:true}),
    body('IdRole').isNumeric({no_symbols:true}).exists('checkNull'),
    body('Password').isStrongPassword({
        minLength: 7,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1
    }).withMessage('Password is not strong'),
    body('StreetAndNumber').isLength({min:4})
]

const emailSchema=[
    body('Email').isEmail().withMessage('Must contain e-mail')
]

const emailVerifyCodeSchema=[
    body('Email').isEmail().withMessage('Must contain e-mail'),
    body('Code').isLength({min:5, max:5})
]
const loginSchema=[
    body('Email').isEmail().withMessage('Must contain e-mail'),
    body('Password').isStrongPassword({
        minLength: 7,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1
    }).withMessage('Password is not strong')
]

const auhorizedUserSchema=[
    header('Authorization').contains('Barear ')
]

const generatetokenSchema=[
    header('Authorization').contains('Barear '),
    header('Refresh')
]

const changePassword=[
    body('Email').isEmail().withMessage('Must contain e-mail'),
    header('Tempauth').isString().exists('checkNull'),
    body('Password').isStrongPassword({
        minLength: 7,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1
    }).withMessage('Password is not strong')

]

export {userSchema, emailVerifyCodeSchema, emailSchema, loginSchema, auhorizedUserSchema, userEditSchema, changePassword, generatetokenSchema}
