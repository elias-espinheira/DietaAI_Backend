import Fastify from "fastify";
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import { routes } from './routes';

dotenv.config();

const app = Fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
    reply.status(400).send({ message: error.message });
});

const start = async () => {
    await app.register(cors, {
        origin: '*',
    });

    await app.register(routes);

    try {
        const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3333;
        await app.listen({ port, host: "0.0.0.0" });
        console.log(`Servidor rodando em http://localhost:${port}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
