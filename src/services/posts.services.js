const pool = require("../db/pool");

async function getAllPosts(){
    const result = await pool.query(
        "SELECT id, author_id, title, content, published, created_at FROM posts ORDER BY id ASC"
    );
    return result.rows;
};

module.exports = {
    getAllPosts
};