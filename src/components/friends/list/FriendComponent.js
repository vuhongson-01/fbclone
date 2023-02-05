import { useState, useEffect } from "react";
import { Avatar, View } from "react-native-ui-lib";
import UserService from "../../../helper/services/UserService";;
import Notification from "../../../utils/Notification";
import { StyleSheet } from "react-native";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { COLOR } from "../../../constants/constants";

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: 100,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    userName: {
        color: COLOR.text,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 20,
    },
    textContainer: {
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
    },
    status: {
        fontFamily: 'Roboto',
        fontWeight: 'normal',
        fontSize: 16,
    },
    activeStatus: {
        color: '#2ECC71'
    },
    blockedStatus: {
        color: '#E74C3C'
    },  
    moreActions: {

    }
});

const FriendComponent = ({friendId, isBlocked}) => {
    const [friend, setFriend] = useState({});

    useEffect(() => {
        UserService.get(friendId)
        .then(res => {
            setFriend(res.data.data);
        })
        .catch(error => {
            Notification.showErrorMessage('Đã xảy ra lỗi khi lấy thông tin bạn bè');
        })
    }, []);

    return(
        <View style={styles.container}>
            <Avatar source={{ uri: friend.avatar }} size={80} onPress={() => handleAvatarPress(friend.block_diary, friend._id) }></Avatar>
            <View style={styles.textContainer}>
                <TouchableOpacity onPress={() => handleAvatarPress(friend.block_diary, friend._id) }>
                    <Text style={styles.userName}>{ friend.username }</Text>
                </TouchableOpacity>
                <Text style={isBlocked? styles.blockedStatus : styles.activeStatus}>{ isBlocked? 'Blocked' : 'Active' }</Text>
            </View>
            <TouchableOpacity style={styles.moreActions} onPress={() => handlePress(friend._id)}>
                <FontAwesomeIcon size={24} icon={faEllipsisH} color={ COLOR.text } />
            </TouchableOpacity>
        </View>
    );
}

export default FriendComponent;