const database = require('./main_db');
const oracledb = require('oracledb')



async function addToCart(pid,cid,status,amount){
    let sql="";
   
         sql = `
        INSERT INTO CART_HAS(PRODUCT_ID, CART_ID, STATUS, AMOUNT)
        VALUES(:pid, :cid, :status, :amount)
        `;
    
 
    const binds = {
        pid: pid,
        cid: cid,
        status: status,
        amount: amount
    }
    const resul= (await database.execute(sql, binds, database.options));
    return resul;     // can access each info by resul[0].PHONE / result[0].PASSWORD
}


async function removeFromCart(pid,cid){
    let sql="";
   
         sql = `
        DELETE FROM CART_HAS WHERE PRODUCT_ID=:pid AND CART_ID=:cid
        `;
    
 
    const binds = {
        pid: pid,
        cid: cid
    }
    const resul= (await database.execute(sql, binds, database.options));
    return resul;     // can access each info by resul[0].PHONE / result[0].PASSWORD
}



async function inCart(pid,cid){
    let sql="";
   
         sql = `
         select * from CART_HAS where PRODUCT_ID= :pid AND CART_ID= :cid
        `;
    
 
    const binds = {
        pid: pid,
        cid: cid
    }
    const resul= (await database.execute(sql, binds, database.options));
    return resul;     // can access each info by resul[0].PHONE / result[0].PASSWORD
}


async function allinCart(cid){
    let sql="";
   
         sql = `
         SELECT P.PRODUCT_ID, P.NAME,P.GENDER_CATEGORY, P.TYPE_OF, P.MATERIAL,P.PRICE,P.QUANTITY,P.SIZE_OF,
         P.SELLER_TYPE,P.USED_STATUS, C.CART_ID,C.STATUS, C.AMOUNT
         FROM CART_HAS C JOIN PRODUCT P 
         ON (C.PRODUCT_ID=P.PRODUCT_ID) 
         WHERE C.CART_ID=:cid
        `;
    
 
    const binds = {
        cid: cid
    }
    const resul= (await database.execute(sql, binds, database.options));
    return resul;     // can access each info by resul[0].PHONE / result[0].PASSWORD
}




async function existsInOrder(buyerID,pid) {
    const sql = `
    SELECT *
    FROM ORDERS O JOIN PRODUCT_ORDERS PO ON (O.ORDER_ID = PO.ORDER_ID) JOIN CART C ON (O.CART_ID = C.CART_ID)
    WHERE PO.PRODUCT_ID=:pid AND O.ORDER_STATUS='processing' AND C.BUYER_ID=:buyerID
    `;

    const binds = {
        buyerID:buyerID,
        pid:pid
    };

    const resul= (await database.execute(sql, binds, database.options));
    return resul;
}



async function createNewOrder(cid) {
    const sql = `
        DECLARE
            OrderId NUMBER;
        BEGIN
            INSERT INTO ORDERS(CART_ID, ORDER_STATUS, ORDER_DATE) VALUES(:cid, 'processing', SYSDATE)
            RETURNING ORDER_ID INTO :OrderId;
        END;
    `;

    const bindVars = {
        cid: cid,
        OrderId: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
    };

    try {
        const connection = await oracledb.getConnection();
        const result = await connection.execute(
            sql,
            bindVars,
            { outFormat: oracledb.OBJECT }
        );
        await connection.close();
        
        console.log("Result:", result.outBinds.OrderId);
       
        
        return result.outBinds.OrderId;
    } catch (err) {
        console.error("Error executing SQL:", err);
        throw err; // Rethrow the error to handle it at a higher level if needed
    }
}



async function getTotalSales(id,role) {
    const sql = `
        DECLARE
            sales NUMBER
        BEGIN
            IF :role='shop' THEN
            sales:= TOTAL_SALE(:id);
            ELSIF :role='seller' THEN
            sales:= TOTAL_SALE_OF_SELLER(:id);
            END IF;
        END;
    `;

    const bindVars = {
        id: id,
        role: role,
        sales: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
    };

    try {
        const connection = await oracledb.getConnection();
        const result = await connection.execute(
            sql,
            bindVars,
            { outFormat: oracledb.OBJECT }
        );
        await connection.close();
        
        console.log("Result:", result.outBinds.OrderId);
       
        
        return result.outBinds.OrderId;
    } catch (err) {
        console.error("Error executing SQL:", err);
        throw err; // Rethrow the error to handle it at a higher level if needed
    }
}


async function createPayment(oid,method,price) {
    const sql = `
        DECLARE
            PayId NUMBER;
        BEGIN
            INSERT INTO PAYMENT(ORDER_ID, METHOD, PAY_DATE, TOTAL_PRICE) VALUES(:oid, :method, SYSDATE, :price);
           
        END;
    `;

    const binds = {
        oid:oid,
        method:method,
        price:price
    };

    const resul= (await database.execute(sql, binds, database.options));
    return resul;
}



async function addToOrder(pid,oid,amount){
    let sql="";
   
         sql = `
        INSERT INTO PRODUCT_ORDERS(PRODUCT_ID, ORDER_ID, AMOUNT) VALUES(:pid,:oid,:amount)
        `;
    
 
    const binds = {
        pid:pid,
        oid:oid,
        amount:amount
    }
    const resul= (await database.execute(sql, binds, database.options));
    return resul;     // can access each info by resul[0].PHONE / result[0].PASSWORD
}

async function updateProductStatus(pid,status){
    let sql="";
   
         sql = `
        UPDATE CART_HAS SET STATUS=:status WHERE PRODUCT_ID=:pid
        `;
    
 
    const binds = {
        pid:pid,
        status:status
    }
    const resul= (await database.execute(sql, binds, database.options));
    return resul;     // can access each info by resul[0].PHONE / result[0].PASSWORD
}


async function myOrderedProducts(id){
    let sql="";
   
         sql = `
         
         SELECT ORDER_STATUS,ORDER_DATE,P.PRODUCT_ID PRODUCT_ID,
         AMOUNT,P.NAME NAME , GENDER_CATEGORY, TYPE_OF,MATERIAL,
         PRICE, IMAGE, S.NAME SHOP_NAME FROM ORDERS O JOIN PRODUCT_ORDERS PO
          ON (O.ORDER_ID = PO.ORDER_ID)  JOIN CART C ON
         (O.CART_ID = C.CART_ID) JOIN PRODUCT P ON
          (P.PRODUCT_ID=PO.PRODUCT_ID) JOIN SHOP_OWNS SO ON 
          (SO.PRODUCT_ID=P.PRODUCT_ID) JOIN SHOP S ON 
          (S.SHOP_ID=SO.SHOP_ID) WHERE C.BUYER_ID=:id 
         

        `;
    
 
    const binds = {
        id:id
    }
    const resul= (await database.execute(sql, binds, database.options));
    return resul;     // can access each info by resul[0].PHONE / result[0].PASSWORD
}



async function updateAmount(orderId,productId,amount){
    let sql="";
   
         sql = `
         
         UPDATE PRODUCT_ORDERS SET AMOUNT = :amount WHERE PRODUCT_ID =:productId
         AND ORDER_ID =:orderId
         

        `;
    
 
    const binds = {
        orderId:orderId, productId:productId, amount:amount
    }
    const resul= (await database.execute(sql, binds, database.options));
    return resul;     // can access each info by resul[0].PHONE / result[0].PASSWORD
}


module.exports={
    addToCart,
    removeFromCart,
    allinCart,
    inCart,
    createNewOrder,
    addToOrder,
    createPayment,
    updateProductStatus,
    myOrderedProducts,
    existsInOrder,
    updateAmount

}
