import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

let server: Server;

async function bootstrap() {
    const port = config.port || 8080;
    try {
        await mongoose.connect(config.database_uri as string, {
            dbName: config.database_name,
        });
        console.log('Database connected successfully..');
        server = app.listen(port, () => {
            console.log(`URL: http://localhost:${port}`);
        });
    } catch (error) {
        throw error;
    }
}

bootstrap();

process.on('unhandledRejection', () => {
    console.log('Unhandled Reject Detected.. Server Shutting Down');
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
});

process.on('uncaughtException', () => {
    console.log('Unhandled Exception Detected.. Server Shutting Down');
    process.exit(1);
});
