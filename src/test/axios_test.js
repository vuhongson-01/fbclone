import React from 'react';
import UserService from '../helper/services/UserService';

export default class PersonList extends React.Component {
    state = {
        persons: []
    }

    componentDidMount() {
        UserService.get('638b1ad746be731d08acbcab')
        .then(res => console.log(res.status))
        .catch(err => console.log(err));
    }

    render() {
        return (
            <></>
        )
    }
}