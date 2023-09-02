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



async function getAllProductsOf(id,role){    // to get all products of a shop or seller by id
    let sql="";
    console.log(role);
    if(role=='user'){
         sql = `
         SELECT *
         FROM 
             PRODUCT P JOIN SELLER_OWNS S ON (P.PRODUCT_ID = S.PRODUCT_ID)
         WHERE 
             S.SELLER_ID=:id
        `;
        console.log("hello");
        console.log(role);
        
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
    console.log(binds);
    console.log(sql);
    console.log(resul);
   
    return resul;     
}


async function addShopProduct(name, gender, type, material, price, quantity, img, size,usedStatus, shopid){
    let sql="";


         sql = `
         BEGIN
         ADD_A_PRODUCT(:name, :gender, :type, :material, :price, :quantity, :img, :size,'shop',:usedStatus,:shopid);
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
        shopid: shopid,
        usedStatus:usedStatus
    }
    const resul= (await database.execute(sql,binds,database.options));
   
    return resul;     // can access each info by resul[0].PHONE / result[0].PASSWORD
}

async function addSellerProduct(name, gender, type, material, price, quantity, img, size,usedStatus, sellerid){
    
    let sql="";
    console.log(name,gender,type,material,price,quantity,img,size,usedStatus,sellerid);

         sql = `
         BEGIN
         ADD_A_PRODUCT_FROM_SELLER(:name, :gender, :type, :material, :price, :quantity,:img, :size,'seller',:usedStatus,:sellerid);
         END;
        `;
        console.log('hello');
        

    const binds = {
        name: name,
        gender: gender,
        type: type,
        material: material,
        price: price,
        quantity: quantity,
        img: img,
        size: size,
        sellerid: sellerid,
        usedStatus:usedStatus
    }
    const resul= (await database.execute(sql,binds,database.options));
   
    return resul;     // can access each info by resul[0].PHONE / result[0].PASSWORD
}


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

async function getProductbyName(name,id,role){
    let sql="";
    if(role=='shop'){
        sql = `
         SELECT *
         FROM 
             PRODUCT P JOIN SHOP_OWNS S
             ON(P.PRODUCT_ID=S.PRODUCT_ID)
         WHERE 
             LOWER(P.NAME) LIKE LOWER('%' || :name || '%') AND 
             S.SHOP_ID=:id


        `;
    }
    else if(role=='user'){
        sql = `
        SELECT *
        FROM 
            PRODUCT P JOIN SEllER_OWNS S
            ON(P.PRODUCT_ID=S.PRODUCT_ID)
        WHERE 
            LOWER(P.NAME) LIKE LOWER('%' || :name || '%') AND 
            S.SELLER_ID=:id


       `;
    }
        
    
    //console.log(sql);
    const binds = {
        name: name,
        id:id
    }
    const resul= (await database.execute(sql,binds,database.options));
   
   
    return resul;     
}

async function getProductbyGender(gender,id,role)
{   
        let sql="";

   if(role=='shop'){

    
    sql = `
     SELECT *
     FROM 
         PRODUCT P JOIN SHOP_OWNS S
         ON(P.PRODUCT_ID=S.PRODUCT_ID)
     WHERE 
         LOWER(P.GENDER_CATEGORY)=LOWER(:gender) AND 
         S.SHOP_ID=:id


    `;
    
   }

   else{
    sql = `
     SELECT *
     FROM 
         PRODUCT P JOIN SELLER_OWNS S
         ON(P.PRODUCT_ID=S.PRODUCT_ID)
     WHERE 
         LOWER(P.GENDER_CATEGORY)=LOWER(:gender) AND 
         S.SELLER_ID=:id


    `;
   }
//console.log(sql);
const binds = {
    gender: gender,
    id:id
}
const resul= (await database.execute(sql,binds,database.options));


return resul; 

}


async function getProductbyCategory(category,id,role){
    let sql="";
    if(role=='shop'){
        sql = `
         SELECT *
         FROM 
             PRODUCT P JOIN SHOP_OWNS S
             ON(P.PRODUCT_ID=S.PRODUCT_ID)
         WHERE 
             LOWER(P.TYPE_OF) LIKE LOWER('%' || :category || '%') AND 
             S.SHOP_ID=:id


        `;
    }
    else if(role=='user'){
        sql = `
         SELECT *
         FROM 
             PRODUCT P JOIN SELLER_OWNS S
             ON(P.PRODUCT_ID=S.PRODUCT_ID)
         WHERE 
             LOWER(P.TYPE_OF) LIKE LOWER('%' || :category || '%') AND 
             S.SELLER_ID=:id


        `;
    }
        
    
    //console.log(sql);
    const binds = {
        category: category,
        id:id
    }
    const resul= (await database.execute(sql,binds,database.options));
   
   
    return resul;     
}

async function getBuyerID(id)          // Returns only the buyer id as number. not rows
{
    let sql="";
    sql = `
    SELECT 
    B.BUYER_ID
    FROM BUYER B JOIN BASIC_USER U ON ( B.USER_ID = U.USER_ID)
    WHERE B.USER_ID = :id

   `;
   

//console.log(sql);
const binds = {
   id:id,
}
const resul= (await database.execute(sql,binds,database.options));


return resul[0].BUYER_ID;     

}



async function getCartID(id)          // Returns only the buyer id as number. not rows
{
    let sql="";
    sql = `
    SELECT 
    CART_ID
    FROM CART
    WHERE BUYER_ID = :id

   `;
   

//console.log(sql);
const binds = {
   id:id,
}
const resul= (await database.execute(sql,binds,database.options));


return resul[0].CART_ID;     

}

// 



async function getProductbyID(id){
    let sql="";
    
        sql = `
         SELECT *
         FROM 
             PRODUCT 
         WHERE 
             PRODUCT_ID=:id 


        `;
        
    
    //console.log(sql);
    const binds = {
        id:id
    }
    const resul= (await database.execute(sql,binds,database.options));
   console.log(resul);
   
    return resul;     
}

//Sql for updating details of a product


async function updateProduct(details){
    const sql = `
        UPDATE PRODUCT
            SET NAME=:productName,TYPE_OF=:productCategory,MATERIAL= :productMaterial,PRICE= :productPrice, QUANTITY=:productQuantity,SIZE_OF=:productSize,USED_STATUS=:productUsedStatus
        WHERE PRODUCT_ID=:productid
        `
    const binds = {
        productid:details.productid,
        productName:details.productName,
        productPrice: details.productPrice,
        productMaterial:details.productMaterial,
        productCategory:details.productCategory,
        productSize: details.productSize,
        productQuantity:details.productQuantity,
        productUsedStatus:details.productUsedStatus
 
    }
    return await database.execute(sql, binds,database.options);
}

async function deleteProduct(productId){
  
    const sql = `
    DELETE FROM PRODUCT WHERE PRODUCT_ID=:productId
        `
    const binds = {
        productId:productId
 
    }
    return await database.execute(sql, binds,database.options);
}





 


module.exports={
    getAllProductsOfAll,
    addShopProduct,
    getAllProductsOf,
    getMenTrending,
    getProductbyName,
    getProductbyCategory,
    getBuyerID,
    getProductbyID,
    updateProduct,
    deleteProduct,
    getProductbyGender,
    addSellerProduct,
    getCartID
}
