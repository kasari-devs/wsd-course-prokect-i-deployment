import {sql} from "../database/database.js";

const calculateSumOfLists = async () => {
    const rows = await sql `SELECT COUNT(*) AS total_rows
    FROM shopping_lists;`;
    if (rows && rows[0] && rows[0].total_rows) {
        return rows[0].total_rows;
    }
      //console.log(rows[0].total_rows);
      return 0;
};

const calculateSumOfItems = async () => {
    const rows = await sql `SELECT COUNT(*) AS total_items
    FROM shopping_list_items ;`;
    if (rows && rows[0] && rows[0].total_items) {
        return rows[0].total_items;
    }
      //console.log(rows[0].total_items);
      return 0;
};

export {
    calculateSumOfItems,
    calculateSumOfLists,
};