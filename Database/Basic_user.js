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


async function getUserInfo(id){
    let sql="";
    
    sql = `
        SELECT FIRST_NAME, LAST_NAME, (FIRST_NAME||' '||LAST_NAME) NAME, ADDRESS, E_MAIL, PHONE
        FROM BASIC_USER
        WHERE USER_ID= :id
        `;
 
        const binds = {
            id: id
        }
   
    const resul= (await database.execute(sql,binds,database.options));
   
    return resul; 
}

async function updateUserInfo(id, fname, lname, address, e_mail, phone){
    let sql="";
    
    sql = `
        
    UPDATE BASIC_USER
    SET FIRST_NAME = :fname, 
        LAST_NAME = :lname, 
        ADDRESS = :address, 
        E_MAIL = :e_mail, 
        PHONE = :phone
    WHERE USER_ID = :id;
    `;
 
        const binds = {
            id: id,
            fname:fname,
            lname:lname,
            address:address,
            e_mail:e_mail,
            phone:phone
        }
   
    const resul= (await database.execute(sql,binds,database.options));
   
    return resul; 
}













module.exports={
    getSellerByUser,
    getUserInfo,
    updateUserInfo
}