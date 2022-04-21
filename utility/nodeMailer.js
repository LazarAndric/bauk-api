import nodemailer from 'nodemailer'
import env from 'dotenv'

env.config()

const transport = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PW
    }
});
console.log('SMTP Configured')

const sendMail=(to, subject, text, html)=>{
    const from=process.env.EMAIL
    const message = {from, to, subject, text, html}
    transport.sendMail(message, (error)=>{
    if(error){
        console.log('Error occured '+error.message)
        return false
    }
    console.log('Message is sent successfully!')
    })
    return true
}

export default sendMail

