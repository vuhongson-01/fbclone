import InviteComponent from "./invite/InviteComponent";
import ListFriendComponent from "./list/ListFriendComponent";
import { useState } from "react";
import { Tab, TabView, Text } from '@rneui/themed';
import { View } from "react-native";
import { COLOR } from "../../constants/constants";
import { useSelector } from 'react-redux'
import { selectAuth } from '../../store/auth/authSlice'
import Notification from "../../utils/Notification";

const FriendshipComponent = ({ navigation }) => {

    const [index, setIndex] = useState(0);
    const { user } = useSelector(selectAuth);
    const [blocks, setBlockes] = useState([]);

    handleAvatarPress = (block_diary, id) => {
        setBlockes(block_diary);
        if (blocks.includes(user._id)) {
            Notification.showWarningMessage('Thông báo', 'Không thể xem thông tin của người này.');
        } else {
            navigation.navigate('ProfileScreen', { userId: id });
        }
        setBlockes([]);
    }
    
    return (
        <View style={{ width: '100%', height: '100%' }}>
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{ backgroundColor: COLOR.icon }}
                style={{ width: '100%' }}
            >
                <Tab.Item
                    title="Lời mời kết bạn"
                    titleStyle={(active) => ({
                        color: active ? COLOR.icon : COLOR.text,
                        fontSize: 18,
                        fontFamily: 'Roboto'
                    })}
                />
                <Tab.Item
                    title="Bạn bè"
                    titleStyle={(active) => ({
                        color: active ? COLOR.icon : COLOR.text,
                        fontSize: 18,
                        fontFamily: 'Roboto'
                    })}
                />
            </Tab>

            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item style={{ width: '100%' }}>
                    <InviteComponent />
                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <ListFriendComponent />
                </TabView.Item>
            </TabView>
        </View>
    );
}

export default FriendshipComponent;