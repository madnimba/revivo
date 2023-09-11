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


async function getAllProductsOfSeller(){    // to get all products of a shop or seller by id
    let sql="";
   
    
         sql = `
         SELECT *
         FROM 
             PRODUCT P JOIN SELLER_OWNS S ON (P.PRODUCT_ID = S.PRODUCT_ID)
         
        `;
       
        
    
    const resul= (await database.execute(sql,{},database.options));
    return resul;     
}

async function getAllProductsOf(id,role){    // to get all products of a shop or seller by id
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
        
    console.log(id);
    //console.log(sql);
    const binds = {
        id:id
    }
    const resul= (await database.execute(sql,binds,database.options));
   console.log(resul);
   
    return resul;     
}

async function updateShop(details){
    const sql = `
    UPDATE SHOP
        SET NAME=:shopName,E_MAIL=:email,PHONE=:phone,IMAGES=:shopImage
    WHERE SHOP_ID=:shopid
    ` 
    const binds = {
        shopid:details.shopid,
        shopName:details.shopName,
        email:details.email,
        phone: details.phone,
        shopImage:details.shopImage
 
    }
    return await database.execute(sql, binds,database.options);
}
//Sql for updating details of a product


async function updateProduct(details){
    
    const sql = `
        UPDATE PRODUCT
            SET NAME=:productName,GENDER_CATEGORY=:productGender,TYPE_OF=:productCategory,MATERIAL= :productMaterial,PRICE= :productPrice, QUANTITY=:productQuantity,IMAGE=:productImage,SIZE_OF=:productSize,USED_STATUS=:productUsedStatus
        WHERE PRODUCT_ID=:productid
        `
    const binds = {
        productid:details.productid,
        productName:details.productName,
        productGender:details.productGender,
        productPrice: details.productPrice,
        productMaterial:details.productMaterial,
        productCategory:details.productCategory,
        productSize: details.productSize,
        productQuantity:details.productQuantity,
        productUsedStatus:details.productUsedStatus,
        productImage:details.productImage
 
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


async function getCategories(genders){
  
    let gender = '';
    let totalResult = [];
    for(let i=0;i<genders.length;i++)
    {
        gender = genders[i];

        const sql = `
        SELECT DISTINCT TYPE_OF FROM PRODUCT WHERE GENDER_CATEGORY=:gender
            `
        const binds = {
           gender: gender
     
        }
        const result= await database.execute(sql, binds,database.options);
        console.log(result);

        for(let j=0;j<result.length;j++)
        {
            totalResult.push(result[j]);
        }
        
    }
   

    return totalResult;
}


async function getMaterials(genders, categories){
  
    let gender = '';
    let category = '';
    let totalResult = [];
    for(let i=0;i<genders.length;i++)
    {
        for(let k=0;k<categories.length;k++)
        {
        gender = genders[i];
        category = categories[k];

        const sql = `
        SELECT DISTINCT MATERIAL FROM PRODUCT WHERE GENDER_CATEGORY=:gender AND TYPE_OF=:category
            `
        const binds = {
           gender: gender,
           category:category
     
        }
        const result= await database.execute(sql, binds,database.options);

        for(let j=0;j<result.length;j++)
        {
            totalResult.push(result[j]);
        }
        
    }
   
    }
    console.log(totalResult);
    return totalResult;
}



async function getFilteredResult(genders, categories, materials,ownerID) {

    let gender = '';
    let category = '';
    let material = '';
    let totalResult = [];
    let sql ='';
    
    for (let i = 0; i < genders.length; i++) {
        for (let k = 0; k < categories.length; k++) {
            for (let m = 0; m < materials.length; m++) {
                gender = genders[i];
                category = categories[k];
                material = materials[m];

                if(ownerID===-1)
                {
                sql = `
        SELECT * FROM PRODUCT WHERE GENDER_CATEGORY=:gender AND TYPE_OF=:category AND MATERIAL=:material AND SELLER_TYPE='seller'
            `
                }
                else
                {
                    sql = `
                    SELECT * FROM PRODUCT P JOIN SHOP_OWNS S ON (P.PRODUCT_ID=S.PRODUCT_ID) WHERE P.GENDER_CATEGORY=:gender AND P.TYPE_OF=:category AND P.MATERIAL=:material
                    AND S.SHOP_ID=:ownerID
                        ` 
                }
                const binds = {
                    gender: gender,
                    category: category,
                    material: material,
                    ownerID: ownerID

                }
                const result = await database.execute(sql, binds, database.options);
                console.log(result);

                for (let j = 0; j < result.length; j++) {
                    totalResult.push(result[j]);
                }
            }

        }

    }
    console.log(totalResult);
    return totalResult;
}

async function getFilteredResultSeller(genders, categories, materials,ownerID) {

    let gender = '';
    let category = '';
    let material = '';
    let totalResult = [];
    let sql ='';
    
    for (let i = 0; i < genders.length; i++) {
        for (let k = 0; k < categories.length; k++) {
            for (let m = 0; m < materials.length; m++) {
                gender = genders[i];
                category = categories[k];
                material = materials[m];
                console.log(gender);
                console.log(category);
                console.log(material);
                console.log(ownerID);

                if(ownerID===-1)
                {
                sql = `
        SELECT * FROM PRODUCT WHERE GENDER_CATEGORY=:gender AND TYPE_OF=:category AND MATERIAL=:material AND SELLER_TYPE='seller'
            `
                }
                else
                {
                    sql = `
                    SELECT * FROM PRODUCT P JOIN SELLER_OWNS S ON (P.PRODUCT_ID=S.PRODUCT_ID)
                     WHERE P.GENDER_CATEGORY=:gender AND P.TYPE_OF=:category AND P.MATERIAL=:material
                    AND S.SELLER_ID=:ownerID
                        ` 
                }
                const binds = {
                    gender: gender,
                    category: category,
                    material: material,
                    ownerID: ownerID

                }
                const result = await database.execute(sql, binds, database.options);
                console.log(result);

                for (let j = 0; j < result.length; j++) {
                    totalResult.push(result[j]);
                }
            }

        }

    }
    console.log(totalResult);
    return totalResult;
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
    getCartID,
    getCategories,
    getMaterials,
    getFilteredResult,
    getAllProductsOfSeller,
    getFilteredResultSeller,
    updateShop // for open marketplace
}
