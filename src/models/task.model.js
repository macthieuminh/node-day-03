const pool = require('../config/database')

const taskModel = {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC')
        return rows
    },
    async findOne(id) {
        const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id])
        return rows[0] || null
    },
    async create(taskData) {
        const { title, completed } = taskData;
        let query = 'INSERT INTO tasks (title) VALUES (?)';
        let params = [title];

        if (completed !== undefined) {
            query = 'INSERT INTO tasks (title, completed) VALUES (?, ?)';
            params = [title, completed];
        }

        const [result] = await pool.query(query, params);
        
        return {
            id: result.insertId,
            title,
            completed: completed !== undefined ? completed : false,
            created_at: new Date(), 
            updated_at: new Date() 
        };
    },
    async update(id, taskData) {
        const { title, completed } = taskData;
        const updates = [];
        const params = [];

        if (title !== undefined) {
            updates.push('title = ?');
            params.push(title);
        }
        if (completed !== undefined) {
            updates.push('completed = ?');
            params.push(completed);
        }

        if (updates.length === 0) {
            return 0;
        }

        params.push(id);
        const query = `UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`;
        
        const [result] = await pool.query(query, params);
        return result.affectedRows;
    },
    async destroy(id) {
        const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = taskModel
