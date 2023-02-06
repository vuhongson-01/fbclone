import React from 'react'

import { View, ScrollView, TouchableOpacity, Text, Image, StyleSheet } from 'react-native'

import Avatar from './Avatar'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: 192,
        flexDirection: 'row',
        alignItems: 'center',
    },
    Card: {
        width: 106,
        height: 170,
        position: 'relative',
        marginRight: 8,
    },
    CardStory: {
        width: '100%',
        height: 170,
        borderRadius: 12,
    },
    CardUser: {
        position: 'absolute',
        top: 8,
        left: 8,
        background: '#ffffff',
        borderRadius: 20,
        width: 39,
        height: 39,
        alignItems: 'center',
        justifyContent: 'center',
    },
    CardFooter: {
        width: '100%',
        position: 'absolute',
        bottom: 12,
        left: 9,
    },
    Text: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    BottomDivider: {
        width: '100%',
        height: 9,
        backgroundColor: '#bbb',
    },
    AddStory: {
        backgroundColor: '#1777f2',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 18,
        width: 36,
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
})

const Story = () => {
    return (
        <>
            <View style={styles.Container}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ paddingLeft: 11 }}>
                    <View style={styles.Card}>
                        <Image
                            style={styles.CardStory}
                            source={require('../../../assets/khang_assets/story1.jpg')}
                        />
                        <View style={styles.CardUser}>
                            <View
                                style={styles.AddStory}
                            >
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    color='white'
                                    size={24}
                                />
                            </View>
                        </View>
                        <View style={styles.CardFooter}>
                            <Text style={styles.Text}>Add To Story</Text>
                        </View>
                    </View>

                    <View style={styles.Card}>
                        <Image
                            style={styles.CardStory}
                            source={require('../../../assets/khang_assets/story2.jpg')}
                        />
                        <View style={styles.CardUser}>
                            <Avatar
                                source={require('../../../assets/khang_assets/user2.jpg')}
                                story={true}
                            />
                        </View>
                        <View style={styles.CardFooter}>
                            <Text style={styles.Text}>Wanessa J</Text>
                        </View>
                    </View>

                    <View style={styles.Card}>
                        <Image
                            style={styles.CardStory}
                            source={require('../../../assets/khang_assets/story3.jpg')}
                        />
                        <View style={styles.CardUser}>
                            <Avatar
                                source={require('../../../assets/khang_assets/user3.jpg')}
                                story={true}
                            />
                        </View>
                        <View style={styles.CardFooter}>
                            <Text style={styles.Text}>Regi P</Text>
                        </View>
                    </View>

                    <View style={styles.Card}>
                        <Image
                            style={styles.CardStory}
                            source={require('../../../assets/khang_assets/story4.jpg')}
                        />
                        <View style={styles.CardUser}>
                            <Avatar
                                source={require('../../../assets/khang_assets/user4.jpg')}
                            />
                        </View>
                        <View style={styles.CardFooter}>
                            <Text style={styles.Text}>Anna M</Text>
                        </View>
                    </View>

                    <View style={styles.Card}>
                        <Image
                            style={styles.CardStory}
                            source={require('../../../assets/khang_assets/story4.jpg')}
                        />
                        <View style={styles.CardUser}>
                            <Avatar
                                source={require('../../../assets/khang_assets/user4.jpg')}
                            />
                        </View>
                        <View style={styles.CardFooter}>
                            <Text style={styles.Text}>Anna M</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.BottomDivider} />
        </>
    )
}

export default Story
