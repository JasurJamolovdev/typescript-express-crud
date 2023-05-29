import { Pool, PoolClient, QueryResult } from 'pg';

const pool =  new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Jasuruzmir404',
    database: 'tester',
    port: 5432
});

const fetchData = async(query: string, ...params: any[]): Promise<any> => {
    let client: PoolClient | null = null;
    try {
        client = await pool.connect()
        const result: QueryResult<any> = await pool.query(query, params);
        return result.rows;
    } catch(error) {
        console.log(error);
    } finally {
        if(client) {
            client.release();
        }
    }
}

export { fetchData };