import React from 'react'

import { View, StyleSheet } from 'react-native'

import Avatar from './Avatar'
import { TextInput } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native-ui-lib'

const styles = StyleSheet.create({

    Container: {
        width: '100%',
        height: 72,
        marginLeft: 12,
    }
    ,
    Row: {
        flexDirection: 'row',
        background: '#ffffff',
        width: '100%',
        paddingHorizontal: 0,
        paddingVertical: 11,
        alignUtems: 'center',
    }
    ,
    Input: {
        height: 50,
        width: '100%',
        paddingHorizontal: 0,
        paddingVertical: 8,
        marginLeft: 8,
        fontSize: 16,
    }
    ,
    Divider: {
        width: '100%',
        height: 0.5,
        background: '#f0f0f0',
    }
    ,
    Menu: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 42,
    }
    ,
    MenuText: {

        paddingLeft: 11,
        fontWeight: 500,
        fontSize: 12,
    }
    ,
    Separator: {

        width: 1,
        height: 26,
        background: '#f0f0f0',
    }
    ,
    BottomDivider: {
        width: '100%',
        height: 9,
        backgroundColor: '#bbb',
    }

})

const ToolBar = () => {
    return (
        <>
            <TouchableOpacity style={styles.Container}>
                <View style={styles.Row}>
                    <Avatar source={require('../../../assets/khang_assets/user1.jpg')} />
                    <TextInput style={styles.Input} placeholderTextColor="#333" placeholder="What's on your mind?" />
                </View>
            </TouchableOpacity>
            <View style={styles.Divider} />
            {/* <Row>
					<Menu>
						<Ionicons name='ios-videocam' size={22} color='#F44337' />
						<MenuText>Live</MenuText>
					</Menu>
					<Separator />

					<Menu>
						<MaterialIcons
							name='photo-size-select-actual'
							size={20}
							color='#4CAF50'
						/>
						<MenuText>Photo</MenuText>
					</Menu>
					<Separator />

					<Menu>
						<MaterialCommunityIcons
							name='video-plus'
							size={22}
							color='#E141FC'
						/>
						<MenuText>Room</MenuText>
					</Menu>
				</Row> */}
            <View style={styles.BottomDivider} />
        </>
    )
}

export default ToolBar
