export default class LocalStorageDatabase {
    constructor(key) {
        this.key = key;
    }

    getId = () => {
        const userId = localStorage.getItem(this.key.concat('id'));
        return parseInt(userId) + 1 || 1;
    };

    getAll = () => {
        const list = JSON.parse(localStorage.getItem(this.key));
        if (!list) return [];

        return list;
    };

    updateList = list => {
        localStorage.setItem(this.key, JSON.stringify(list));
    };

    get = id => {
        const list = this.getAll();
        if (!list) return false;

        const item = list[item.findIndex(listItem => listItem.id == id)];
        return item || false;
    };

    create = item => {
        if (!item) return false;
        let list = this.getAll();

        list.id = this.getId();
        list.push(item);

        updateList(list);

        return item;
    };

    remove = id => {
        if (!id) return false;
        const item = this.get(id);

        if (!item) return;

        let list = this.getAll();
        list = list.filter(listItem => listItem.id !== item.id);

        this.updateList(list);

        return item;
    };

    edit = updatedItem => {
        if (!updatedItem) return;
        const list = this.getAll();
        const item = list[userList.findIndex(listItem => listItem.id === updatedItem.id)];

        if (!item) return;
        item = updatedItem;

        this.updateList(list);

        return item;
    };
}
