import SQLite from 'react-native-sqlite-storage';

export const localDatabase = SQLite.openDatabase(
    {
        name: 'social_network_app_db',
        location: 'default',
    },
    () => { },
    error => {
        console.log("ERROR: " + error);
    }
);
