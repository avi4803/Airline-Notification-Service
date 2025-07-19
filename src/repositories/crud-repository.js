const { StatusCodes } = require('http-status-codes');

class CrudRepository {
    constructor(model){
        this.model = model;
    }

    async create(data){
        const response = await this.model.create(data);
        return response ; 
    }

    async destroy(data){
        const response = await this.model.destroy({
                where : {
                    id: data 
                }
            });
        if(!response){
            throw new AppError("No Results with requested id", StatusCodes.NOT_FOUND);
        }
        return response ;    
    }

    async get(data){
        const response = await this.model.findByPk(data);
        if(!response){
            throw new AppError("No Results with requested id", StatusCodes.NOT_FOUND);
            
        }
        
        return response ;
    }


    async getAll(){
        const response = await this.model.findAll();
        return response ;
    }

    async update(id,data){   //data -> {column:value}
        const response = await this.model.update(data , {
            where: {
                id:id
            }
        });
        if(!response){
            throw new AppError('Not found anything with given id', StatusCodes.NOT_FOUND);
            
        }
        return response ;
    }
}



module.exports = CrudRepository;