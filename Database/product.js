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
         SELECT *
         FROM 
             PRODUCT P JOIN SELLER_OWNS S ON (P.PRODUCT_ID = S.PRODUCT_ID)
         WHERE 
             S.SELLER_ID=:id
        `;
        
    }
    else if(role=='shop'){
         sql = `
SELECT *
FROM 
    PRODUCT P JOIN SHOP_OWNS S ON (P.PRODUCT_ID = S.PRODUCT_ID)
WHERE 
    S.SHOP_ID=:id
        `;
    }
 
    const binds = {
        id: id
    }
    const resul= (await database.execute(sql,binds,database.options));
   
    return resul;     
}


async function addShopProduct(name, gender, type, material, price, quantity, img, size, shopid){
    let sql="";

         sql = `
         BEGIN
         ADD_A_PRODUCT(:name, :gender, :type, :material, :price, :quantity, :img, :size,'shop','',:shopid);
         END;
        `;
        

    const binds = {
        name: name,
        gender: gender,
        type: type,
        material: material,
        price: price,
        quantity: quantity,
        img: img,
        size: size,
        shopid: shopid
    }
    const resul= (await database.execute(sql,binds,database.options));
   
    return resul;     // can access each info by resul[0].PHONE / result[0].PASSWORD
}


// async function addShopProduct(name, gender, type, material, price, quantity, img, size, shopid){
//     let sql="";

//          sql = `
//          BEGIN
//          ADD_A_PRODUCT(:name, :gender, :type, :material, :price, :quantity, :img, :size,'shop','',:shopid);
//          END;
//         `;
        

//     const binds = {
//         name: name,
//         gender: gender,
//         type: type,
//         material: material,
//         price: price,
//         quantity: quantity,
//         img: img,
//         size: size,
//         shopid: shopid
//     }
//     const resul= (await database.execute(sql,binds,database.options));
   
//     return resul;     // can access each info by resul[0].PHONE / result[0].PASSWORD
// }






async function getMenTrending(id){
    let sql="";
  
         sql = `
SELECT *
FROM 
    PRODUCT P JOIN SHOP_OWNS S ON (P.PRODUCT_ID = S.PRODUCT_ID)
WHERE 
    S.SHOP_ID=:id AND P.GENDER_CATEGORY='male'
        `;
    
 
    const binds = {
        id: id
    }
    const resul= (await database.execute(sql,binds,database.options));
   
    return resul;     // can access each info by resul[0].PHONE / result[0].PASSWORD
}

async function getProductbyName(name,idshop){
    let sql="";
    
        sql = `
         SELECT *
         FROM 
             PRODUCT P JOIN SHOP_OWNS S
             ON(P.PRODUCT_ID=S.PRODUCT_ID)
         WHERE 
             LOWER(P.NAME)=LOWER(:name) AND 
             S.SHOP_ID=:idshop


        `;
        
    
    //console.log(sql);
    const binds = {
        name: name,
        idshop:idshop
    }
    const resul= (await database.execute(sql,binds,database.options));
   
   
    return resul;     
}

async function getProductbyCategory(category,idshop){
    let sql="";
    
        sql = `
         SELECT *
         FROM 
             PRODUCT P JOIN SHOP_OWNS S
             ON(P.PRODUCT_ID=S.PRODUCT_ID)
         WHERE 
             LOWER(P.TYPE_OF)=LOWER(:category) AND 
             S.SHOP_ID=:idshop


        `;
        
    
    //console.log(sql);
    const binds = {
        category: category,
        idshop:idshop
    }
    const resul= (await database.execute(sql,binds,database.options));
   
   
    return resul;     
}




 


module.exports={
    getAllProductsOfAll,
    addShopProduct,
    getAllProductsOf,
    getMenTrending,
    getProductbyName,
    getProductbyCategory
}
