import { useState, useEffect } from "react";
import { Avatar, View } from "react-native-ui-lib";
import { StyleSheet } from "react-native";
import { COLOR } from "../../../constants/constants";
import UserService from "../../../helper/services/UserService";
import Notification from "../../../utils/Notification";
import { Text, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: 100,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    userName: {
        color: COLOR.text,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 20
    },
    rightPane: {
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-around'
    },
    btnWrapper: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        height: '50%'
    },
    btn: {
        borderRadius: 10,
        width: '48%',
        height: '100%',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
    },
    acceptBtn: {
        backgroundColor: COLOR.icon,
    },
    declineBtn: {
        backgroundColor: '#ABB2B9',
    },
    btnContent: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    }
});

const DetailInviteComponent = ({senderId}) => {

    const [sender, setSender] = useState({});

    useEffect(() => {
        UserService.get(senderId)
        .then(res => {
            setSender(res.data.data);
        })
        .catch(error => {
            Notification.showErrorMessage('Đã xảy ra lỗi khi lấy thông tin');
        })
    }, []);

    return(
        <View style={styles.container}>
            <Avatar source={{ uri: sender.avatar }} size={80} onPress={() => handleAvatarPress(sender.block_diary, sender._id) }></Avatar>
            <View style={styles.rightPane}>
                <TouchableOpacity onPress={() => handleAvatarPress(sender.block_diary, sender._id) }>
                    <Text style={styles.userName}>{ sender.username }</Text>
                </TouchableOpacity>
                <View style={styles.btnWrapper}>
                    <TouchableOpacity style={[styles.acceptBtn, styles.btn]} onPress={() => handleClick('accept', senderId)}>
                        <Text style={[styles.btnContent, {color: '#FFFFFF'}]}>{"Chấp nhận"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.declineBtn, styles.btn]} onPress={() => handleClick('reject', senderId)}>
                        <Text style={styles.btnContent}>{"Từ chối"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default DetailInviteComponent;