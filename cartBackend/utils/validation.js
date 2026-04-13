 exports.validateQuantity = (qty) => {
    if( !qty || qty <= 0 ){
        return "Quantity must be greater than 0 ";
    }
    return null ; 
 };