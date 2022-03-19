export default class LocalStorageDatabase {
    constructor(key, headers) {
        this.key = key;
        this.headers = headers;
    }

    getId = () => {
        const userId = localStorage.getItem(this.key.concat('id'));
        const id = userId ? parseInt(userId) + 1 : 1;
        localStorage.setItem(this.key.concat('id'), id);
        return id;
    };

    getAll = () => {
        const list = JSON.parse(localStorage.getItem(this.key));
        if (!list) return [];

        return list;
    };

    updateDatabase = data => {
        localStorage.setItem(this.key, JSON.stringify(data));
    };

    get = id => {
        const list = this.getAll();
        if (!list) return false;

        const item = list[list.findIndex(listItem => listItem.id == id)];
        return item || false;
    };

    create = item => {
        if (!item) return false;
        let database = this.getAll();

        item.id = this.getId();
        database.push(item);

        this.updateDatabase(database);

        return item;
    };

    remove = id => {
        if (!id) return false;
        const item = this.get(id);

        if (!item) return;

        let database = this.getAll();
        database = database.filter(databaseItem => databaseItem.id !== item.id);

        this.updateDatabase(database);

        return item;
    };

    update = updatedItem => {
        if (!updatedItem) return;
        const database = this.getAll();
        let index = database.findIndex(databaseItem => databaseItem.id === updatedItem.id);

        if (!index) return;
        database[index] = updatedItem;

        this.updateDatabase(database);

        return true;
    };
}
