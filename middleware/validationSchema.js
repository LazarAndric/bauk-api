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

const verifyMailCodeSchema=[
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
    header('mailtoken').isString().exists('checkNull'),
    passwordSchema
]

const postPlace=[
    body('PlaceName').isString().exists('checkNull'),
    body('AreaCode').isNumeric().exists('checkNull')
]

const putPlaces=[
    body('PlaceName').isString().exists('checkNull'),
    body('AreaCode').isNumeric().exists('checkNull'),
    body('Active').isBoolean().exists('checkNull')
]

const pictures=[
    body('*.Name').exists('checkNull'),
    body('*.File_Path').exists('checkNull')
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
    body('Date').isDate('YYYY-MM-DD').exists('checkNull'),
    body('IdPlace').exists('checkNull'),
    body('SlotsNumber').exists('checkNull')
]

const postVisits=[
    body('*.Date').isDate('YYYY-MM-DD').exists('checkNull'),
    body('*.IdPlace').exists('checkNull'),
    body('*.SlotsNumber').exists('checkNull')
]

const orders=[
    body('Description').isString().exists('checkNull'),
    body('IdVisit').isInt().exists('checkNull'),
    body('IdAddress').isInt().exists('checkNull'),
    body('Price').isFloat().exists('checkNull'),
    body('Items').isArray({min:1}).exists('checkNull'),
    body('Items.*.IdProduct').isInt().exists('checkNull'),
    body('Items.*.IdSize').isInt().exists('checkNull'),
    body('Items.*.Price').isFloat().exists('checkNull'),
    body('Items.*.Additions').exists('checkNull'),
    body('Items.*.Additions.*.ID').isInt().exists('checkNull')
]

const postStatus=[
    body('Name').isString().exists('checkNull')
]
export {postStatus, putPlaces, pictures, orders, postVisits, postVisit, postAddition, postAdditions, postSizes, postSize, postProduct, postPlace, userSchema, verifyMailCodeSchema, emailSchema, loginSchema, auhorizedUserSchema, userEditSchema, changePassword, generatetokenSchema}
