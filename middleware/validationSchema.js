import {body, check, checkSchema, header} from 'express-validator'

const emailSchema=[
    body('Email').isEmail().withMessage('Must contain e-mail')
]

const passwordSchema=[
    body('Password').isStrongPassword({
        minLength: 7,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1
    }).withMessage('Password is not strong')
]

const auhorizedUserSchema=[
    header('Authorization').contains('Bearer ')
]

const userSchema=[
    body('FirstName').isString().isLength({min:2}),
    body('LastName').isString().isLength({min:2}),
    body('PhoneNumber').isMobilePhone('sr-RS'),
    emailSchema,
    body('IdStatus').isNumeric({no_symbols:true}),
    body('IdRole').isNumeric({no_symbols:true}).exists('checkNull'),
    passwordSchema,
    body('Addresses').isArray().isLength({min:1}),
    body('Addresses.*.StreetAndNumber').exists('checkNull'),
    body('Addresses.*.IdPlace').exists('checkNull'),
    body('Addresses.*.GpsLocation').exists('checkNull')
]

const userEditSchema=[
    auhorizedUserSchema,
    body('FirstName').isString().isLength({min:2}),
    body('LastName').isString().isLength({min:2}),
    body('PhoneNumber').isMobilePhone('sr-RS'),
    emailSchema,
    body('IdStatus').isNumeric({no_symbols:true}),
    body('IdRole').isNumeric({no_symbols:true}).exists('checkNull'),
    passwordSchema
]

const emailVerifyCodeSchema=[
    emailSchema,
    body('Code').isLength({min:5, max:5})
]

const loginSchema=[
    emailSchema,
    passwordSchema
]

const generatetokenSchema=[
    auhorizedUserSchema,
    header('Refresh')
]

const changePassword=[
    emailSchema,
    header('Tempauth').isString().exists('checkNull'),
    passwordSchema
]

const postPlace=[
    body('PlaceName').exists('checkNull'),
    body('AreaCode').exists('checkNull')
]

const postProduct=[
    body('IdPicture').exists('checkNull'),
    body('Name').exists('checkNull'),
    body('Description').exists('checkNull'),
    body('Available').exists('checkNull').isBoolean(),
    body('Sizes').exists('checkNull').isArray(),
    body('Sizes.*.IdSize').exists('checkNull'),
    body('Sizes.*.Price').exists('checkNull'),
    body('Additions').exists('checkNull').isArray(),
    body('Additions.*.IdAddition').exists('checkNull')
]

const postSize=[
    body('Size').exists('checkNull')
]

const postSizes=[
    body().isArray().exists('checkNull'),
    body('*.Size').exists('checkNull')
]

const postAddition=[
    body('Name').exists('checkNull'),
    body('Price').exists('checkNull')
]

const postAdditions=[
    body().isArray().exists('checkNull'),
    body('*.Name').exists('checkNull'),
    body('*.Price').exists('checkNull')
]

const postVisit=[
    body('Date').isDate('DD/MM/YYYY/').exists('checkNull'),
    body('IdPlace').exists('checkNull'),
    body('SlotsNumber').exists('checkNull')
]

const postVisits=[
    body('*.Date').isDate('YYYY-MM-DD').exists('checkNull'),
    body('*.IdPlace').exists('checkNull'),
    body('*.SlotsNumber').exists('checkNull')
]

export {postVisits, postVisit, postAddition, postAdditions, postSizes, postSize, postProduct, postPlace, userSchema, emailVerifyCodeSchema, emailSchema, loginSchema, auhorizedUserSchema, userEditSchema, changePassword, generatetokenSchema}
