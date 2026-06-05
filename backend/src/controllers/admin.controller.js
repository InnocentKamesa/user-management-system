import pool from '../config/db.config.js';

export const getAllUsers = async (req, res, next) => {

    try {
        const {rows, rowCOunt} = await pool.query("SELECT id, username, email FROM users WHERE role='classic'");
        if(rowCount !== 1 || rows.length === 0){
            const error = new Error("Error while getting users or No users found");
            error.status = 404;
            next(error)
        }
        res.status(200).json({success:true, message:"successfully retreived users", users:rows})
    } catch (error) {
        next(error)
    }
}

export const getUserById = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const {rows, rowCount} = await pool.query("SELECT id, username, email FROM users WHERE id=$1", [userId]);
        if(rowCount !== 1 || rows.length === 0){
            const error = new Error("Error while getting user or No user found");
            error.status = 404;
            next(error)
        }
        res.status(200).json({success:true, message:"successfully retreived user", user:rows[0]})
    } catch (error) {
        next(error)
    }
}

export const patchUserById = async (req, res, next) => {
    const userId = req.params.id;
    const {username, email} = req.body;
    try {
        const {rowCount} = await pool.query("UPDATE users SET username=$1, email=$2 WHERE id=$3", [username, email, userId]);
        if(rowCount !== 1){
            const error = new Error("Error while updating user or No user found");
            error.status = 404;
            next(error)
        }
        res.status(200).json({success:true, message:"successfully updated user"})
    } catch (error) {
        next(error)
    }
}