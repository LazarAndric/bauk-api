import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'lazarandric97@gmail.com',
        pass: 'ljekiqlcuvvidqvw'
    }
});
console.log('SMTP Configured');

// from: 'lazarandric97@gmail.com',
    
//         to: 'lazarndrc@gmail.com',
    
//         subject: 'Nodemailer is unicode friendly ✔', 
    
//         text: 'Hello to myself!',
    
//         html:'<p><b>Hello</b> to myself <img src="cid:note@node"/></p>'+
//              '<p>Here\'s a nyan cat for you as an embedded attachment:<br/></p>'

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

