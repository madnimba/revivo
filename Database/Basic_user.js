const database = require('./main_db');

async function getSellerByUser(id){
    let sql="";
    
    sql = `
        SELECT *
        FROM SELLER 
        WHERE USER_ID= :id
        `;
 
        const binds = {
            id: id
        }
   
    const resul= (await database.execute(sql,binds,database.options));
   
    return resul; 
}












module.exports={
    getSellerByUser
}