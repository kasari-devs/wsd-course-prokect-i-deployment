import {sql} from "../database/database.js";

const createListItem = async (listId, name) => {
    await sql `INSERT INTO shopping_list_items (shopping_list_id, name)
     VALUES (${listId}, ${name})`
};
const viewCurrentListItems = async (id) => {
    return await sql `SELECT *
    FROM shopping_list_items
    WHERE shopping_list_id = ${id}`;
};

const collectItem = async (id) => {
    await sql `UPDATE shopping_list_items
    SET collected = TRUE
    WHERE id = ${id};`
};

export {
    createListItem,
    viewCurrentListItems,
    collectItem,
}

