import React, { useState, useEffect } from "react";
import { View, Avatar } from "react-native-ui-lib";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import UserService from '../helper/services/UserService';
import { setDateDiff } from "../utils/utils";

const CommentComponent = ({ props }) => {
    const [avatarUrl, setAvatarUrl] = useState();

    useEffect(() => {
        UserService.get(props.user._id)
            .then(res => {
                setAvatarUrl(res.data.data.avatar);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <View style={styles.parent}>
            <View style={styles.container}>
                <Avatar size={45} source={{ uri: avatarUrl }} />
                <View style={styles.textWrap}>
                    <Text style={styles.username}> {props.user.username} </Text>
                    <Text style={styles.comment}> {props.content}</Text>
                </View>
            </View>
            <View style={styles.action}>
                <Text style={styles.time}>{ setDateDiff(props.createdAt) }</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    parent: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: 15,
    },
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 5,
        justifyContent: 'space-around'
    },
    textWrap: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#E5E8E8',
    },
    username: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000000'
    },
    comment: {
        fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: 'normal',
        color: '#000000'
    },
    action: {
        width: '100%',
        paddingLeft: '20%'
    },
    time: {
        fontFamily: 'Roboto',
        fontWeight: 'normal',
        fontSize: 16,
        color: '#000000'
    }
});

export default CommentComponent;