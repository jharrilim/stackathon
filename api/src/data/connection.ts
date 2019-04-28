import { createConnection, Connection } from 'typeorm';
import { entities } from './entities';

export async function connect(dropSchema: boolean = false): Promise<Connection> {
    // Note:         You don't have to configure your connections like this; I just do it for the type hints.
    // Alternatives: https://typeorm.io/#/using-ormconfig/
    return await createConnection({
        name: 'default',
        cli: {
            entitiesDir: `${__dirname}/entities`,
            migrationsDir: `${__dirname}/migrations`,
            subscribersDir: `${__dirname}/subscribers`
        },
        type: 'postgres',
        database: process.env.DB_NAME || 'stackathon',
        username: process.env.DB_USER || 'dev',
        password: process.env.DB_PASSWORD || 'password',
        port: +(process.env.DB_PORT || 5432),
        host: process.env.DB_HOST || 'localhost',
        entities: entities,
        migrations: [`${__dirname}/migrations/*.js`],
        subscribers: [ `${__dirname}/subscribers/*.js`],
        synchronize: process.env.NODE_ENV !== 'production' && dropSchema,
        logger: 'advanced-console',
        logging: 'all',
        dropSchema: process.env.NODE_ENV !== 'production' && dropSchema,
        cache: true,
    });
}
