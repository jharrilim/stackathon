import 'reflect-metadata';
import { Express } from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
import { isMaster, fork, on as clusterOn } from 'cluster';
import { cpus } from 'os';
import { useContainer, Connection } from 'typeorm';
import { Container } from 'typedi';
import { connect } from './data/connection';
import { createExpressServer } from 'routing-controllers';
import { seedQuestions } from './data/seed/question.seed';

async function master() {
    const cpusCount = cpus().length;
    console.info(`Starting ${cpusCount} workers.`);
    let conn: Connection | null = null;
    try {
        conn = await connect(true);
        await seedQuestions();
    } finally {
        conn && await conn.close();
    }

    for (let i = 0; i < cpusCount; i++) {
        const worker = fork();
        console.info(`Started worker: ${worker.id} ${worker.process.pid}`);
    }
    clusterOn('exit', (worker, code, signal) => {
        console.warn(`${worker.id} died: [${signal}] ${code}`);
        console.warn('Starting a new process...');
        fork();
    });
}

async function worker() {
    const port = +(process.env.API_PORT || 8080);
    const version = process.env.API_VERSION || 'v1';
    await connect();
    const app: Express = createExpressServer({
        cors: true,
        controllers: [`${__dirname}/**/*.controller.js`],
        middlewares: [morgan('combined')],
        routePrefix: `/api/${version}`
    });
    app.listen(port, () => {
        console.log(`Server running on ${port}!`);
    });
}

async function main() {
    config();
    useContainer(Container);
    if (isMaster) {
        await master();
    } else {
        await worker();
    }
};

main()
    .catch(console.error);
