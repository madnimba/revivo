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
    return resul;     // can access each info by resul[0].PHONE / result[0].PASSWORD
}


async function readID(id,role){
    let sql="";
    if(role=='user'){
         sql = `
        SELECT 
            *
        FROM 
            Basic_user
        WHERE 
            USER_ID = :id
        `;
        
    }
    else if(role=='shop'){
         sql = `
        SELECT 
            *
        FROM 
            Shop
        WHERE 
            SHOP_ID = :id
        `;
    }
 
    const binds = {
        id: id
    }
    const resul= (await database.execute(sql, binds, database.options));
    return resul;     // can access each info by resul[0].PHONE / result[0].PASSWORD
}




module.exports={
    readEmail,
    readID
}
