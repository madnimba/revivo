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
     ORDER BY ORDER_DATE ASC
    `;
    const binds={}
    

    const resul= (await database.execute(sql,binds,database.options));

    return resul; 
}


async function getOrderProductsByShop(id,orderId){
    let sql="";

    sql = `
    SELECT P.NAME,P.GENDER_CATEGORY,P.PRICE,P.TYPE_OF,PO.AMOUNT,O.ORDER_DATE
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


module.exports={
    getAllShops,
    getShopByID,
    getOrderProductsByShop,
    getAllOrders,
    getBuyerbyOrder,
    getPaymentByOrder
}
