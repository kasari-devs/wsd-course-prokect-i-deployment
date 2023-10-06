import {sql} from "../database/database.js";

const create = async (name) => {
    await sql `INSERT INTO shopping_lists (name) VALUES (${name})`;
};
const viewAllNonCompletedTasks = async () => {
    return await sql `SELECT * FROM shopping_lists WHERE active = TRUE`;
};

const deactivateList = async (id) => {
    await sql `UPDATE shopping_lists
    SET active = FALSE
    WHERE id = ${id}`
}
const findById = async (id) => {
    const rows = await sql `SELECT * FROM shopping_lists WHERE id = ${id}`;
    if (rows && rows.length > 0) {
        //console.log(rows[0]);
        return rows[0];
    }
    return {id: 0, name: "unknown"};
}
export {
    create,
    viewAllNonCompletedTasks,
    deactivateList,
    findById,
}