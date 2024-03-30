export const db_host = process.env.POSTGRES_HOST || '';
export const db_name = process.env.POSTGRES_DB || '';
export const db_password = process.env.POSTGRES_PASSWORD || '';
export const db_port = Number(process.env.POSTGRES_PORT) || 5432;
export const db_user = process.env.POSTGRES_USER || '';
export const secret_key = process.env.SECRET_KEY || '';
