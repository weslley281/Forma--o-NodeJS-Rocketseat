export class Database {
    database = {};

    select(table) {
        const data = this.database[table];

        if (data) {
            return data;
        }else {
            return [];
        }
    }

    insert(table, data) {
        if (Array.isArray(data)) {
            this.database[table] = data;
        } else {
            if (!this.database[table]) {
                this.database[table] = [];
            }
            this.database[table].push(data);
        }

        return this.database[table];
    }
}