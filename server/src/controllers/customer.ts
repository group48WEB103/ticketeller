import { Request, Response } from 'express';
import pgp from 'pg-promise';
import { Customer } from '../models/customer';
import dotenv from 'dotenv';
dotenv.config();

const connection = {
    host: process.env.HOST,
    port: Number(process.env.PORT),
    database: process.env.DB,
    user: process.env.USER,
    password: process.env.PASSWORD,
    ssl: true,
};

const pool = pgp()(connection);

export class CustomerQueries {

    async getCustomerByCredentials(req: Request, res: Response, email: string, password: string) {
        try {
            const customer = await pool.one('SELECT * FROM customer WHERE email = $1 AND password = $2', [email, password]);
            return res.json(customer);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ 'error': 'Invalid Credentials.' });
        }
    };

    async getCustomerByEmail(req: Request, res: Response, email: string) {
        try {
            const customer = await pool.one('SELECT * FROM customer WHERE email = $1', [email]);
            return res.json(customer);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: 'Server error fetching customer by email' });
        }
    };

    createNewCustomer(req: Request, res: Response, data: Customer) { 
        try {
            pool.none('INSERT INTO customer (name, email, password, tickets) VALUES ($1, $2, $3, $4)', 
            [data.name, data.email, data.password, data.tickets]); 
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error creating new customer' });
        }
    };

    updateCustomer(req: Request, res: Response, id: string, data: Customer) {
        try {
            pool.none('UPDATE customer SET name = $1, email = $2, password = $3, tickets = $4 WHERE id = $5',
            [data.name, data.email, data.password, data.tickets, id]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error updating customer' });
        }
    };

    deleteCustomer(req: Request, res: Response, id: string) {
        try {
            pool.none('DELETE from customer WHERE id = $1', [id]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error deleting customer' });
        }
    };

};