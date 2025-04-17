import pg from 'pg';    
export const pool = new pg.Pool({
user: 'postgres',
host: 'localhost', 
password: '2854',
database   : 'jbregister',
port: 5432,
});

pool.query('SELECT NOW()').then((res) => {
    console.log(res)});

// Función para insertar datos en la tabla balance
export async function insertBalance(id, name, balance) {
    const query = 'INSERT INTO balance (id, name, balance) VALUES ($1, $2, $3)';
    const values = [id, name, balance];
    try {
        const res = await pool.query(query, values);
        console.log('Datos insertados:', res.rowCount);
    } catch (err) {
        console.error('Error al insertar datos:', err);
    }
}

//funcion para id automatico
export async function insertBalance1(name, balance) {
    try {
        const query = 'INSERT INTO bal (name, balance) VALUES ($1, $2)';
        const values = [name, balance];
        const res = await pool.query(query, values);
        console.log("Datos guardados en la base de datos:", { name, balance });
    } catch (err) {
        console.error("Error al guardar en la base de datos:", err.message);
    }
}