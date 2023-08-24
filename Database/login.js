const database = require('./main_db');


async function readEmail(mail,role){
    let sql="";
    if(role=='user'){
         sql = `
        SELECT 
            *
        FROM 
            Basic_user
        WHERE 
            E_mail = :mail 
        `;
        
    }
    else if(role=='shop'){
         sql = `
        SELECT 
            *
        FROM 
            Shop
        WHERE 
            E_mail = :mail
        `;
    }
 
    const binds = {
        mail: mail
    }
    const resul= (await database.execute(sql, binds, database.options));
    return resul.rows;
}




module.exports={
    readEmail
}
