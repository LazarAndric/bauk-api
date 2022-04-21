import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'lazarndrc@gmail.com',
        pass: 'fshfgqzsrefudyuf'
    }
});
console.log('SMTP Configured')

const sendMail=(from, to, subject, text, html)=>{
    const message = {from, to, subject, text, html}
    transport.sendMail(message, (error, info)=>{
    if(error){
        console.log('Error occured '+error.message)
        return false
    }
    console.log('Message is sent successfully '+info)
    })
    return true
}

export default sendMail

