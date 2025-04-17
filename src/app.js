import express from 'express';
import { PORT } from './configports.js';
import userRoutes from './rutas/user.routes.js';
import { insertBalance, insertBalance1 } from './dbcon.js';
import ModbusRTU from 'modbus-serial';

const app = express();
const client = new ModbusRTU();

// Dirección IP y puerto del dispositivo (balanza)
const IP_BALANZA = "192.168.0.10"; // Reemplaza con la IP real de la balanza
const PUERTO_BALANZA = 502;

// Función para leer datos de la balanza mediante ModbusRTU
async function leerBalanza() {
    try {
        
        // Conexión a la balanza mediante Modbus TCP
        await client.connectTCP(IP_BALANZA, { port: PUERTO_BALANZA });
        

        // Configura el ID del esclavo (balanza)
        client.setID(1);

        // Espera un momento para estabilizar la conexión
        await new Promise(resolve => setTimeout(resolve, 500));

        // Configura un timeout opcional en milisegundos
        client.setTimeout(1000);

        // Lee 10 registros a partir del registro 0
        const data = await client.readHoldingRegisters(0, 1);
        console.log("Datos de la balanza:", data.data);

        // Guarda los datos en la base de datos
        const balance = parseFloat(data.data[0]); // Ejemplo: usar el primer registro como balance
        await guardarEnBaseDeDatos('Balanza', balance); // ID y nombre son ejemplos

    } catch (err) {
        if (err.code === 'ECONNRESET') {
            console.error("Error: La conexión fue restablecida por el dispositivo (ECONNRESET).");
        } else if (err.code === 'ETIMEDOUT') {
            console.error("Error: La conexión con el dispositivo ha expirado (ETIMEDOUT).");
        } else {
            console.error("Error durante la lectura:", err.message);
        }
    } finally {
        // Cierra la conexión
        try {
            client.close();
        } catch (closeErr) {
            console.error("Error al cerrar la conexión:", closeErr.message);
        }
    }
}

// Función para guardar los datos leídos en la base de datos
async function guardarEnBaseDeDatos(name, balance) {
    try {
        await insertBalance1(name, balance);
        console.log("Datos guardados en la base de datos:", { name, balance });
    } catch (err) {
        console.error("Error al guardar en la base de datos:", err.message);
    }
}

// Configuración del servidor
app.use(userRoutes);

// Llama a la función de lectura periódicamente (por ejemplo, cada 5 segundos)
setInterval(() => {
    leerBalanza().catch(err => {
        console.error("Error no manejado en leerBalanza:", err.message);
    });
}, 5000);

// Manejo global de errores no capturados en promesas
process.on('unhandledRejection', (reason, promise) => {
    console.error("Error no manejado en promesa:", reason);
});

// Manejo global de excepciones no capturadas
process.on('uncaughtException', (err) => {
    console.error("Excepción no capturada:", err.message);
    process.exit(1); // Opcional: Salir del proceso si ocurre un error crítico
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log("Servidor en el puerto", PORT);
});