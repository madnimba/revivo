ALTER TABLE SHOP_OWNS
DROP CONSTRAINT product_s_fk;

ALTER TABLE SHOP_OWNS
ADD CONSTRAINT product_s_fk
FOREIGN KEY (PRODUCT_ID)
REFERENCES PRODUCT (PRODUCT_ID)
ON DELETE CASCADE;

ALTER TABLE seller_owns
DROP CONSTRAINT  product_selsp_fk;

ALTER TABLE seller_owns
ADD CONSTRAINT product_selsp_fk
FOREIGN KEY (PRODUCT_ID)
REFERENCES PRODUCT (PRODUCT_ID)
ON DELETE CASCADE;

ALTER TABLE Cart_has
DROP CONSTRAINT  product_c_fk;

ALTER TABLE Cart_has
ADD CONSTRAINT product_c_fk
FOREIGN KEY (PRODUCT_ID)
REFERENCES PRODUCT (PRODUCT_ID)
ON DELETE CASCADE;



ALTER TABLE product_orders
DROP CONSTRAINT  product_pop_fk;

ALTER TABLE product_orders
ADD CONSTRAINT product_pop_fk
FOREIGN KEY (PRODUCT_ID)
REFERENCES PRODUCT (PRODUCT_ID)
ON DELETE CASCADE;







