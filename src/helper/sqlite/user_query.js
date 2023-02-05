import { localDatabase } from "./config";

ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
    localDatabase.transaction((trans) => {
        trans.executeSql(sql, params, (trans, results) => {
            resolve(results);
        },
            (error) => {
                reject(error);
            });
    });
});

export async function CreateTable() {
    let query = "CREATE TABLE IF NOT EXISTS users "
        + "(_id VARCHAR(20) PRIMARY KEY NOT NULL, "
        + "phonenumber VARCHAR(20), "
        + "username VARCHAR(100), "
        + "password VARCHAR(255), "
        + "token TEXT, "
        + "last_access VARCHAR(50)"
        + ")"
    await this.ExecuteQuery(query, []);
}

export async function getAllUsers() {
    let query = "SELECT * FROM users";
    let exec = await this.ExecuteQuery(query, []);
    let rows = exec.rows;
    for (let i = 0; i < rows.length; i++) {
        var item = rows.item(i);
        console.log(item);
    }
}

export async function getFirstUsers() {
    let query = "SELECT * FROM users LIMIT 1";
    let exec = await this.ExecuteQuery(query, []);
    let res = [];
    for (let i = 0; i < exec.rows.length; i++) {
        let item = exec.rows.item(i);
        res.push(item);
    }
    return res;
}

export async function getToken() {
    try {
        const currentUser = await getFirstUsers();
        if (currentUser.length > 0) {
            const user = currentUser[0];
            console.log(user)

            return user.token;
        }

        return '';
    } catch (error) {
        console.log(error);
        return '';
    }
}

export async function insertUser(user) {
    let query = "INSERT INTO users (_id, phonenumber, username, password, token, last_access) VALUES (?, ?, ?, ?, ?, ?)";
    let exec = await this.ExecuteQuery(query, user);
    console.log(exec);
}

export async function updateUser(data) {
    let query = "UPDATE users SET phonenumber = ?, username = ?, password = ?, token = ?, last_access = ? WHERE _id = ?";
    let exec = await this.ExecuteQuery(query, data);
    console.log(exec);
}

export async function deleteAllUsers() {
    let query = "DELETE FROM users";
    let exec = await this.ExecuteQuery(query, []);
    console.log(exec);
}

export async function deleteUser(user_id) {
    let query = "DELETE FROM users WHERE _id = ?";
    let exec = await this.ExecuteQuery(query, user_id);
    console.log(exec);
}

export async function getUserById(user_id) {
    let query = "SELECT * FROM users WHERE _id = ?";
    let exec = await this.ExecuteQuery(query, user_id);
    console.log(exec.rows.item(0));
}