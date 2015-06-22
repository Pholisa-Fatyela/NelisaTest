//Author:	Taariq Isaacs and Pholisa Fatyela
//Date: 	09/03/2015
//File:		filter.js
//=======
//Author:	        Taariq Isaacs
//Date: 	        09/03/2015
//File:		        filter.js

var itemMap = {};
exports.sortData = function(itemArr){ 
	 
         itemArr.forEach(function(item) {

                if(!itemMap[item.itemName]) {
                        itemMap[item.itemName] = item.noSold;
                }
                else {
                        var q = itemMap[item.itemName];
                        itemMap[item.itemName] = parseInt(q) + parseInt(item.noSold);
                }
         });
        return itemMap;
	
}

