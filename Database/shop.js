const database = require('./main_db');


async function getAllShops(){
    let sql="";
    
    sql = `
        SELECT 
            *
        FROM 
            SHOP
        `;
        
   
 
        const binds = {}
   
    const resul= (await database.execute(sql,binds,database.options));
   
    return resul;     // can access each info by resul[0].PHONE / result[0].PASSWORD
}


module.exports={
    getAllShops
}
