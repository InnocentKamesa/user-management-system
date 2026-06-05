import pool from '../config/db.config.js';

export const isAdmin = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const {rowCount, rows} = await pool.query('SELECT role FROM users WHERE id =$1', [userId]);
        if(rowCount !== 1 || rows[0].role !== 'admin'){
            const error = new Error("Unauthorized access");
            error.status = 403;
            throw error;
        }
        next();
    } catch (error) {
     next(error)
    }
}