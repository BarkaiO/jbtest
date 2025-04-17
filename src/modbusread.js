const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();

// Dirección IP y puerto del dispositivo (balanza)
const IP_BALANZA = "192.168.0.10"; // Reemplaza con la IP real de la balanza
const PUERTO_BALANZA = 502;

async function leerBalanza() {
    try {
        // Conexión a la balanza mediante Modbus TCP
        await client.connectTCP(IP_BALANZA, { port: PUERTO_BALANZA });

        // Configura el ID del esclavo (balanza)
        client.setID(1);

        await new Promise(resolve => setTimeout(resolve, 500)); // medio segundo

        
        // Configura un timeout opcional en milisegundos
        client.setTimeout(1000);

        // Lee 10 registros a partir del registro 0
        try {
            const data = await client.readHoldingRegisters(0, 10);
            console.log("Datos de la balanza:", data.data);
          } catch (err) {
            console.error("Error leyendo los registros:", err.message);
          }
          
    } catch (err) {
        console.error("Error durante la lectura:", err);
    } finally {
        // Cierra la conexión
        client.close();
    }
}


leerBalanza();
