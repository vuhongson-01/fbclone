import { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { COLOR } from "../../../constants/constants";
import DetailInviteComponent from "./DetailInviteComponent";
import FriendService from "../../../helper/services/FriendService";
import Notification from "../../../utils/Notification";
import { Text } from "react-native";

const InviteComponent = () => {
    const [invitations, setInvitations] = useState([]);

    useEffect(() => {
        setInvitations([]);
        FriendService.getRequests()
        .then(res => {
            setInvitations(res.data.data.friends)
        })
        .catch(error => {
            Notification.showErrorMessage('Đã xảy ra lỗi khi lấy dữ liệu ' + error)
        })
    }, []);

    handleClick = (state, senderId) => {
        if (state == 'accept') {
            FriendService.action({
                user_id: senderId,
                is_accept: 1
            })
            .then(res => {
                Notification.showSuccessMessage('Đã chấp nhận lời mời kết bạn');
                setInvitations(current => current.filter(value => {
                    return value._id != senderId;
                }))
            })
            .catch(error => {
                Notification.showErrorMessage('Đã xảy ra lỗi khi gửi dữ liệu');
            })
        } else {
            FriendService.action({
                user_id: senderId,
                is_accept: 2
            })
            .then(res => {
                Notification.showWarningMessage('Đã gỡ lời mời kết bạn');
                setInvitations(current => current.filter(value => {
                    return value._id != senderId;
                }))
            })
            .catch(error => {
                Notification.showErrorMessage('Đã xảy ra lỗi khi gửi dữ liệu');
            })
        }
    }
    return (
        <ScrollView style={{ width: '100%', backgroundColor: COLOR.background, paddingLeft: 10, paddingRight: 10 }}>
            {
                invitations.length <= 0 && 
                <Text style={{ color: COLOR.text, fontSize: 20, fontFamily: 'Roboto', fontWeight: 'bold', marginTop: 10 }}>
                    {'Không có lời mời kết bạn nào.'}
                </Text>
            }
            {
                invitations.map(item => (
                    <View key={item._id}>
                        <DetailInviteComponent senderId={item._id} />
                    </View>
                ))
            }
        </ScrollView>
    );
}

export default InviteComponent;