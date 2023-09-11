const database = require('./main_db');

const Fuse = require('fuse.js');
const { getBuyerID } = require('./product');

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

async function getShopByID(id){
    let sql="";
    
    sql = `
        SELECT 
            *
        FROM 
            SHOP
        WHERE SHOP_ID= :id
        `;
        
   
 
        const binds = {
            id:id
        }
   
    const resul= (await database.execute(sql,binds,database.options));
   
    return resul;     // can access each info by resul[0].PHONE / result[0].PASSWORD
}

async function getAllOrders(){
    let sql="";

    sql=`
    SELECT ORDER_ID
     FROM ORDERS
     WHERE ORDER_STATUS='processing'
     ORDER BY ORDER_DATE ASC
    `;
    const binds={}
    

    const resul= (await database.execute(sql,binds,database.options));

    return resul; 
}
async function getProcessedOrders(id){
    let sql="";

    sql = `
    SELECT P.NAME,P.GENDER_CATEGORY,P.PRICE,P.TYPE_OF,P.PRODUCT_ID,P.QUANTITY,PO.AMOUNT,O.ORDER_ID,O.ORDER_DATE
    FROM 
        ORDERS O JOIN PRODUCT_ORDERS PO
        ON(O.ORDER_ID=PO.ORDER_ID)
        JOIN SHOP_OWNS S 
        ON(PO.PRODUCT_ID=S.PRODUCT_ID)
				JOIN PRODUCT P 
				ON (P.PRODUCT_ID=PO.PRODUCT_ID)
    WHERE S.SHOP_ID= :id AND  O.ORDER_STATUS='shipping' AND MONTHS_BETWEEN(SYSDATE,O.ORDER_DATE)<=1`

    const binds={
        id:id,
    }
    const resul= (await database.execute(sql,binds,database.options));

    return resul; 
}


async function getOrderProductsByShop(id,orderId){
    let sql="";

    sql = `
    SELECT P.NAME,P.GENDER_CATEGORY,P.PRICE,P.TYPE_OF,P.PRODUCT_ID,P.QUANTITY,PO.AMOUNT,O.ORDER_ID,O.ORDER_DATE
    FROM 
        ORDERS O JOIN PRODUCT_ORDERS PO
        ON(O.ORDER_ID=PO.ORDER_ID)
        JOIN SHOP_OWNS S 
        ON(PO.PRODUCT_ID=S.PRODUCT_ID)
				JOIN PRODUCT P 
				ON (P.PRODUCT_ID=PO.PRODUCT_ID)
    WHERE S.SHOP_ID= :id AND O.ORDER_ID= :orderId 
    `;

    const binds={
        id:id,
        orderId:orderId
    }
    const resul= (await database.execute(sql,binds,database.options));

    return resul; 
}

async function getOrderProductsBySeller(id,orderId){
    let sql="";

    sql = `
    SELECT P.NAME,P.GENDER_CATEGORY,P.PRICE,P.TYPE_OF,P.PRODUCT_ID,P.QUANTITY,PO.AMOUNT,O.ORDER_ID,O.ORDER_DATE
    FROM 
        ORDERS O JOIN PRODUCT_ORDERS PO
        ON(O.ORDER_ID=PO.ORDER_ID)
        JOIN SELLER_OWNS S 
        ON(PO.PRODUCT_ID=S.PRODUCT_ID)
				JOIN PRODUCT P 
				ON (P.PRODUCT_ID=PO.PRODUCT_ID)
    WHERE S.SELLER_ID= :id AND O.ORDER_ID= :orderId 
    `;

    const binds={
        id:id,
        orderId:orderId
    }
    const resul= (await database.execute(sql,binds,database.options));

    return resul;

}
async function getBuyerbyOrder(orderId){
    let sql="";
    sql=`
    SELECT (U.FIRST_NAME||' '||U.LAST_NAME) NAME, U.PHONE,U.E_MAIL,U.ADDRESS
    FROM ORDERS O JOIN CART C ON (O.CART_ID=C.CART_ID)
    JOIN BUYER B ON (B.BUYER_ID=C.BUYER_ID)
    JOIN BASIC_USER U ON (B.USER_ID=U.USER_ID)
    WHERE O.ORDER_ID=:orderId
    `;
    const binds={
        orderId:orderId
    }
    const resul= (await database.execute(sql,binds,database.options));

    return resul; 
}

async function getPaymentByOrder(orderId){
    let sql="";
    sql=`SELECT METHOD
    FROM PAYMENT 
    WHERE ORDER_ID=:orderId 
    `;

    const binds={
        orderId:orderId
    }
    const resul= (await database.execute(sql,binds,database.options));

    return resul; 
}
async function Decrease_Product(amount,product_id){
    let sql="";
    sql=`
    UPDATE PRODUCT
    SET QUANTITY = :amount
    WHERE PRODUCT_ID = :product_id
    `;
    const binds={
        amount:amount,
        product_id:product_id
    }
    await database.execute(sql,binds,database.options);
}



async function getProductofShopBySearchText(text,id){
    let sql="";
    let binds = {};
    let totalresult =[];
    let resul =[];

 // ALMOST EXACT SEARCH AMONG THE CATEGORY_NAMES AND PRODUCT_NAMES 

    console.log(text);
    sql=`SELECT *
    FROM 
        PRODUCT P JOIN SHOP_OWNS S
        ON(P.PRODUCT_ID=S.PRODUCT_ID)
    WHERE 
        LOWER(P.NAME) LIKE LOWER('%' || :text || '%')AND 
        S.SHOP_ID=:id`;

        binds = {
            text:text,
            id:id
        }
    
        resul= (await database.execute(sql,binds,database.options));
        for( let i=0;i<resul.length;i++)
        {
            totalresult.push(resul[i]);
        }

        sql=`SELECT *
        FROM 
            PRODUCT P JOIN SHOP_OWNS S
            ON(P.PRODUCT_ID=S.PRODUCT_ID)
        WHERE 
             LOWER(P.TYPE_OF) LIKE LOWER('%' || :text || '%')AND 
            S.SHOP_ID=:id`;
    
            binds = {
                text:text,
                id:id
            }
        
            resul= (await database.execute(sql,binds,database.options));
            for( let i=0;i<resul.length;i++)
            {
                totalresult.push(resul[i]);
            }

        
        
        
    // fuzzy search on categories

    fuseOptions = {
        isCaseSensitive: false,
       // includeScore: false,
        shouldSort: true,
       // includeMatches: false,
       // findAllMatches: false,
        minMatchCharLength: 3,
       // location: 0,
       // threshold: 0.6,
       // distance: 100,
       // useExtendedSearch: false,
       // ignoreLocation: false,
       // ignoreFieldNorm: false,
       // fieldNormWeight: 1,
       keys: [
           "NAME",
           "TYPE_OF",
           "MATERIAL",
       ]
   };
   let newtext = `%${text}%`;
    sql = ` SELECT * FROM PRODUCT P JOIN SHOP_OWNS SO ON (P.PRODUCT_ID=SO.PRODUCT_ID)
    WHERE SO.SHOP_ID=:id`
    binds = {
        id:id
    }
    resul = await database.execute(sql,binds, database.options);

   let fuse = new Fuse(resul, fuseOptions);

    
    let searchPattern = newtext;

    resul = fuse.search(searchPattern)
    
    for (let i = 0; i < resul.length; i++) {

        let productid = resul[i].item.PRODUCT_ID

        sql = ` SELECT * FROM PRODUCT WHERE PRODUCT_ID=:productid`;

        let fil = await database.execute(sql, {productid:productid}, database.options);
        totalresult.push(fil[0]);
    }
        console.log(totalresult);
        
     
        
        
        const uniqueArray = removeDuplicatesByProductID(totalresult);
        console.log(uniqueArray);
        
   
    return uniqueArray;     // can access each info by resul[0].PHONE / result[0].PASSWORD
}

async function getBuyerbyOrder(orderId){
    let sql="";
    sql=`
    SELECT (U.FIRST_NAME||' '||U.LAST_NAME) NAME, U.PHONE,U.E_MAIL,U.ADDRESS
    FROM ORDERS O JOIN CART C ON (O.CART_ID=C.CART_ID)
    JOIN BUYER B ON (B.BUYER_ID=C.BUYER_ID)
    JOIN BASIC_USER U ON (B.USER_ID=U.USER_ID)
    WHERE O.ORDER_ID=:orderId
    `;
    const binds={
        orderId:orderId
    }
    const resul= (await database.execute(sql,binds,database.options));

    return resul; 
}

async function getPaymentByOrder(orderId){
    let sql="";
    sql=`SELECT METHOD
    FROM PAYMENT 
    WHERE ORDER_ID=:orderId 
    `;

    const binds={
        orderId:orderId
    }
    const resul= (await database.execute(sql,binds,database.options));

    return resul; 
}
async function Decrease_Product(amount,product_id){
    let sql="";
    sql=`
    UPDATE PRODUCT
    SET QUANTITY = :amount
    WHERE PRODUCT_ID = :product_id
    `;
    const binds={
        amount:amount,
        product_id:product_id
    }
    await database.execute(sql,binds,database.options);
}

async function getProductofSellerBySearchText(text,id){
    let sql="";
    let binds = {};
    let totalresult =[];
    let resul =[];

 // ALMOST EXACT SEARCH AMONG THE CATEGORY_NAMES AND PRODUCT_NAMES 


    sql=`SELECT *
    FROM 
        PRODUCT P JOIN SELLER_OWNS S
        ON(P.PRODUCT_ID=S.PRODUCT_ID)
    WHERE 
        LOWER(P.NAME) LIKE LOWER('%' || :text || '%')AND 
        S.SELLER_ID=:id`;

        binds = {
            text:text,
            id:id
        }
    
        resul= (await database.execute(sql,binds,database.options));
        for( let i=0;i<resul.length;i++)
        {
            totalresult.push(resul[i]);
        }
        console.log("Hello 1");
        console.log(resul.length);
        console.log(text);
        console.log(totalresult);
        sql=`SELECT *
        FROM 
            PRODUCT P JOIN SELLER_OWNS S
            ON(P.PRODUCT_ID=S.PRODUCT_ID)
        WHERE 
             LOWER(P.TYPE_OF) LIKE LOWER('%' || :text || '%')AND 
            S.SELLER_ID=:id`;
    
            binds = {
                text:text,
                id:id
            }
        
            resul= (await database.execute(sql,binds,database.options));
            for( let i=0;i<resul.length;i++)
            {
                totalresult.push(resul[i]);
            }

            console.log("Hello 2");
            console.log(totalresult);
        
        
    // fuzzy search on categories

    fuseOptions = {
        isCaseSensitive: false,
       // includeScore: false,
        shouldSort: true,
       // includeMatches: false,
       // findAllMatches: false,
        minMatchCharLength: 3,
       // location: 0,
       // threshold: 0.6,
       // distance: 100,
       // useExtendedSearch: false,
       // ignoreLocation: false,
       // ignoreFieldNorm: false,
       // fieldNormWeight: 1,
       keys: [
           "NAME",
           "TYPE_OF",
           "MATERIAL",
       ]
   };
   let newtext = `%${text}%`;

    sql = ` SELECT * FROM PRODUCT P JOIN SELLER_OWNS SO ON (P.PRODUCT_ID=SO.PRODUCT_ID)
    WHERE SO.SELLER_ID=:id`
    binds = {
        id:id
    }
    resul = await database.execute(sql,binds, database.options);
    console.log("Hello 3");
    console.log(resul);
   let fuse = new Fuse(resul, fuseOptions);
   console.log(fuse);

    
    let searchPattern = newtext;
    console.log("Hello 5");
    resul = fuse.search(searchPattern);
    
    console.log("Hello 6");
    console.log(resul);
    
    for (let i = 0; i < resul.length; i++) {

        let productid = resul[i].item.PRODUCT_ID;
        console.log("Hello 7");

        sql = ` SELECT * FROM PRODUCT WHERE PRODUCT_ID=:productid`;

        let fil = await database.execute(sql, {productid:productid}, database.options);
        totalresult.push(fil[0]);
        
    }
    console.log(totalresult);
        
     
        
        
        const uniqueArray = removeDuplicatesByProductID(totalresult);
        console.log(uniqueArray);
        
   
    return uniqueArray;

}


async function getShopBySearchText(text){
    let sql="";
    let binds = {};
    let totalresult =[];
    let resul =[];


let fuseOptions = {
	 isCaseSensitive: false,
	// includeScore: false,
	 shouldSort: true,
	// includeMatches: false,
	// findAllMatches: false,
	 minMatchCharLength: 3,
	// location: 0,
	// threshold: 0.6,
	// distance: 100,
	// useExtendedSearch: false,
	// ignoreLocation: false,
	// ignoreFieldNorm: false,
	// fieldNormWeight: 1,
	keys: [
		"NAME",
	]
};




    // almost exact search among shop names

    let newtext = `%${text}%`;
    sql = `
    SELECT 
        *
    FROM 
        SHOP
    WHERE LOWER(NAME) like LOWER(:newtext)
    `;

    
    binds = {
        newtext:newtext
    }

    resul= (await database.execute(sql,binds,database.options));
    for( let i=0;i<resul.length;i++)
    {
        totalresult.push(resul[i]);
    }

    // FUZZY SEARCH AMONG THE SHOP NAMES

    sql = ` SELECT * FROM SHOP`;
    resul = await database.execute(sql, {}, database.options);

    let fuse = new Fuse(resul, fuseOptions);

    // Change the pattern
    let searchPattern = text;

    resul = fuse.search(searchPattern)
    for (let i = 0; i < resul.length; i++) {
        totalresult.push(resul[i].item);
    }


    // ALMOST EXACT SEARCH AMONG THE CATEGORY_NAMES AND PRODUCT_NAMES 


    sql=`SELECT * FROM SHOP
    WHERE SHOP_ID IN (select s.SHOP_ID from product p join SHOP_OWNS s 
        on s.PRODUCT_ID=p.PRODUCT_ID where Lower(p.TYPE_OF) LIKE LOWER(:newtext) OR LOWER(p.NAME) 
        LIKE LOWER(:newtext))`

        binds = {
            newtext:newtext
        }
    
        resul= (await database.execute(sql,binds,database.options));
        for( let i=0;i<resul.length;i++)
        {
            totalresult.push(resul[i]);
        }

        
        
        
    // fuzzy search on categories

    fuseOptions = {
        isCaseSensitive: false,
       // includeScore: false,
        shouldSort: true,
       // includeMatches: false,
       // findAllMatches: false,
        minMatchCharLength: 3,
       // location: 0,
       // threshold: 0.6,
       // distance: 100,
       // useExtendedSearch: false,
       // ignoreLocation: false,
       // ignoreFieldNorm: false,
       // fieldNormWeight: 1,
       keys: [
           "NAME",
           "TYPE_OF",
           "MATERIAL",
       ]
   };

    sql = ` SELECT * FROM PRODUCT P JOIN SHOP_OWNS SO ON (P.PRODUCT_ID=SO.PRODUCT_ID)`
    resul = await database.execute(sql, {}, database.options);

    fuse = new Fuse(resul, fuseOptions);

    
    searchPattern = text;

    resul = fuse.search(searchPattern)
    
    for (let i = 0; i < resul.length; i++) {

        let shopid = resul[i].item.SHOP_ID

        sql = ` SELECT * FROM SHOP WHERE SHOP_ID=:shopid`;

        let fil = await database.execute(sql, {shopid:shopid}, database.options);
        
        totalresult.push(fil[0]);
    }
        
        
        
        const uniqueArray = removeDuplicatesByShopID(totalresult);
        console.log(uniqueArray);
        
   
    return uniqueArray;     // can access each info by resul[0].PHONE / result[0].PASSWORD
}




function removeDuplicatesByProductID(array) {
    const uniqueProductIDs = [];
    return array.filter((item) => {
      if (!uniqueProductIDs.includes(item.PRODUCT_ID)) {
        uniqueProductIDs.push(item.PRODUCT_ID);
        return true;
      }
      return false;
    });
  }

  function removeDuplicatesByShopID(array) {
    const uniqueSHOPIDs = [];
    return array.filter((item) => {
      if (!uniqueSHOPIDs.includes(item.SHOP_ID)) {
        uniqueSHOPIDs.push(item.SHOP_ID);
        return true;
      }
      return false;
    });
  }




async function Set_OrderStatus(order_id,status){
    let sql="";
    sql=`UPDATE ORDERS
    SET ORDER_STATUS= :status
    WHERE ORDER_ID = :order_id
    `;
    const binds={
        order_id:order_id,
        status:status
    }
    await database.execute(sql,binds,database.options);
}


async function getReviews(shopID){
    let sql="";
    sql=`SELECT (U.FIRST_NAME||' '||U.LAST_NAME) NAME, 
    R.REVIEW_DATE REVIEW_DATE, R.STAR STAR, 
    R.COMMENTS COMMENTS from REVIEWS R join BUYER B 
    ON(R.BUYER_ID=B.BUYER_ID) JOIN BASIC_USER U 
    ON (U.USER_ID = B.USER_ID) where SHOP_ID=:shopID
    `;
    const binds={
        shopID: shopID
    }
    const result = await database.execute(sql,binds,database.options);
    return result;
}

async function addReview(id,shopID,comments,ratings){
    const bid = await getBuyerID(id);
    
    let sql="";
    sql=`
    INSERT INTO REVIEWS(BUYER_ID,SHOP_ID,COMMENTS,STAR, REVIEW_DATE) VALUES(:bid,:shopID,:comments,TO_NUMBER(TRIM(:ratings)),SYSDATE)
    `;
    const binds={
        bid:bid,
        shopID: shopID,
        comments:comments,
        ratings:ratings
    }
    const result = await database.execute(sql,binds,database.options);
    return result;
}

module.exports={
    getAllShops,
    getShopByID,
    getOrderProductsByShop,
    getAllOrders,
    getBuyerbyOrder,
    getPaymentByOrder,
    Decrease_Product,
    Set_OrderStatus,
    getShopBySearchText,
    getProductofShopBySearchText,
    getOrderProductsBySeller,
    getProductofSellerBySearchText,
    getReviews,
    addReview,
    getProcessedOrders
  
}
