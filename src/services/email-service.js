
const {TicketRepository} = require('../repositories/');
const {Mailer} = require('../utils/index')

const ticketRepo = new TicketRepository();

async function sendEmail(mailFrom, mailTo, mailSubject, mailText ){
    try {
        const response = await Mailer.sendMail({
            from:mailFrom,
            to:mailTo,
            subject:mailSubject,
            text:mailText
        })
        return response; 
        
    } catch (error) {
        console.log(error);
        throw error;
        
    }

}

async function createTicket(data) {
    try {
        const response = await ticketRepo.create(data);
        return response;
        
    } catch (error) {
        console.log(error);
        throw error;
        
    }
}


async function getPendingEmails(){
    try {
    const response =  await ticketRepo.getPendingEmails();
    return response;
        
    } catch (error) {
        console.log(error);
        throw error;
        
    }

}

module.exports = {
    sendEmail,
    createTicket,
    getPendingEmails

}