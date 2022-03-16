import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'lazarndrc@gmail.com',
        pass: 'alfzgbeiwvxsmjyu'
    }
});
console.log('SMTP Configured');

const sendMail=(from, to, subject, text, html)=>{
    const message = {from, to, subject, text, html}
    transport.sendMail(message, (error)=>{
    if(error){
        console.log('Error occured');
        console.log(error.message);
        return;
    }
    console.log('Message sent successfully!');
    })
}

export default sendMail

