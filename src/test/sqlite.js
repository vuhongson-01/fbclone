import React from "react";
import { CreateTable, deleteUser, getAllUsers, getUserById, insertUser, updateUser } from "../helper/sqlite/user_query";

class SQLiteTest extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        // await CreateTable();
        // let data = [1, "0111222333", "dieppv", "user123", "sdfasjhdfgkjasdhgfaudsfgadf", "123123"];
        // await insertUser(data);
        // await getAllUsers();
        // let data = ["0222666888", "dieppv_updated", "user123_updated", "token_updated", "last_access_updated", 1];
        // await updateUser(data);
        await getAllUsers();
        // await deleteUser([1]);
        // await getAllUsers();
        // await getUserById([1]);
    }

    render() {
        return(
            <></>
        );
    }
}

export default SQLiteTest;