const database = require('./main_db');



async function createNewUser(user){
    const sql = `
        INSERT INTO
            BASIC_USER(First_name,Last_name,E_mail,Address,Password,Phone,Images)
        VALUES 
            (:fname,:lname,:email,:address,:pass,:phone,:image)`
    const binds = {
        fname: user.fname,
        lname:user.lname,
        email :user.email,
        address: user.address,
        pass: user.pass,
        phone: user.phone,
        image:user.image
    }
    return await database.execute(sql, binds, {});
}

async function createNewShopUser(shop){
    const sql = `
        INSERT INTO
            SHOP(Name,E_mail,Password,Phone,IMAGES)
        VALUES 
            (:name,:email,:pass,:phone,:image)`
            
    const binds = {
        name: shop.name,
        email :shop.email,
        pass: shop.pass,
        phone: shop.phone,
        image:shop.image
    }
    return await database.execute(sql, binds, {});
}

module.exports={
    createNewUser,
    createNewShopUser,
}