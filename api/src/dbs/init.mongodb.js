import mongoose from 'mongoose';

const connectionString = 'mongodb://localhost:27017/?authMechanism=DEFAULT';

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose
            .connect(connectionString, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            })
            .then(() => {
                console.log('Database connection successful');
            })
            .catch((err) => {
                console.error('Database connection error');
            });
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Database();
        }
        return this.instance;
    }
}

const db = Database.getInstance();

export default db;
