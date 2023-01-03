import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
    Container: {
        width: 40,
        height: 40,
        position: 'relative',
        marginLeft: 12,
    },
    User: {

        width: 40,
        height: 40,
        borderRadius: 20,
        borderColor: '#1777f2',
        // borderWidth: ${ props => (props.story ? '3' : 0)},
    },
    UnseenStory: {
        borderWidth: 3,
    },
    UserActive: {
        width: 15,
        height: 15,
        borderRadius: 8,
        background: '#4bcb1f',
        position: 'absolute',
        bottom: -2,
        right: -2,
        borderWidth: 2,
        borderColor: '#ffffff',
    }
})


const Avatar = ({ source, online, story }) => {
    return (
        <View styles={styles.Container}>
            <TouchableOpacity>
                <Image
                    style={[styles.User, story && styles.UnseenStory]}
                    source={source}
                // story={story}
                />
            </TouchableOpacity>
            {/* {online && <UserActive />} */}
        </View>
    )
}

export default Avatar
