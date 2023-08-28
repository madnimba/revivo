const database = require('./main_db');


async function getAllProductsOfAll(role){
    let sql="";
    if(role=='user'){
         sql = `
        SELECT 
            *
        FROM 
            PRODUCT
        WHERE 
            SELLER_TYPE = :role 
        `;
        
    }
    else if(role=='shop'){
         sql = `
        SELECT 
            *
        FROM 
            PRODUCT
        WHERE 
            SELLER_TYPE = :role 
        `;
    }
 
    const binds = {
        role: role
    }
    const resul= (await database.execute(sql,binds,database.options));
   
    return resul;     // can access each info by resul[0].PHONE / result[0].PASSWORD
}



async function getAllProductsOf(id,role){
    let sql="";
    if(role=='user'){
         sql = `
        SELECT 
            *
        FROM 
            PRODUCT
        WHERE 
            SELLER_TYPE = :role AND PRODUCT_ID=:id
        `;
        
    }
    else if(role=='shop'){
         sql = `
        SELECT 
            *
        FROM 
            PRODUCT
        WHERE 
            SELLER_TYPE = :role AND PRODUCT_ID=:id
        `;
    }
 
    const binds = {
        id: id,
        role: role
    }
    const resul= (await database.execute(sql,binds,database.options));
   
    return resul;     
}


 


module.exports={
    getAllProductsOfAll
}
