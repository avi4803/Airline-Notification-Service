const crudRepository = require('./crud-repository.js');
const { Ticket } = require('../models');

class TicketRepository extends crudRepository{
    constructor(){
        super(Ticket);
    }

    async getPendingTickets(){
        const response = await Ticket.findAll({
            where: {
                status: 'PENDING'
            }
        })
        if(!response){
            return {message: 'No tickets pending'}
        }
        return response;

    }
}



module.exports = TicketRepository