import React, { useState, useEffect, useRef, useCallback } from "react"
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    RefreshControl
} from "react-native";
import { View } from "react-native-ui-lib";
import CommentComponent from "../components/CommentComponent";
import PostCommentService from '../helper/services/PostCommentService';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faThumbsUp, faSmile, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import PostService from '../helper/services/PostService';
import { isCloseToBottom } from "../utils/utils";
import { COLOR } from "../constants/constants";
import Notification from "../utils/Notification"

const styles = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: COLOR.background
    },
    header: {
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#E5E8E8',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerTitle: {
        fontFamily: 'Roboto',
        fontSize: 20,
        fontWeight: 'bold',
        color: COLOR.text
    },
    headerIcon: {

    },
    body: {
        flex: 1
    },
    scrollView: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
    },
    footer: {
        width: '80%',
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center'
    },
    textInput: {
        width: '100%',
        borderRadius: 20,
        backgroundColor: '#EAEDED',
        fontSize: 18,
        paddingLeft: 10,
        color: COLOR.text,
        paddingTop: 10
    },
    iconWrap: {
        marginLeft: 10
    },
    emojiWrap: {
        height: '100%',
        width: '100%'
    }
})
const Comment = ({ route, navigation }) => {
    const { postId } = route.params;
    const [comment, setComment] = useState('');
    const [listComments, setListComments] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [responseFor, setResponseFor] = useState();
    const scrollViewRef = useRef();
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        PostService.getById(postId)
            .then(res => {
                setIsLiked(res.data.data.isLike);
            })
            .catch(err => console.log(err));
        loadData(10);
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        loadData(listComments.length > 0 ? (listComments.length + 5) : 10);
    }

    const loadData = (limit) => {
        let body = {
            skip: 0,
            limit: limit
        }
        setListComments([]);
        PostCommentService.getList(postId, body)
            .then(res => {
                setListComments(res.data.data);
                setRefreshing(false);
            })
            .catch(err => console.log(err));
    }

    const appendData = () => {
        let _skip = listComments.length;
        let body = {
            skip: _skip,
            limit: 5
        }
        PostCommentService.getList(postId, body)
            .then(res => {
                setListComments([...listComments, ...res.data.data]);
            })
            .catch(err => console.log(err));
    }

    const likeAction = () => {
        PostService.like(postId)
            .then(res => {
                setIsLiked(!isLiked);
            })
            .catch(err => console.log(err));
    }

    const sendComment = () => {
        PostCommentService.create(postId, {
            content: comment,
            commentAnswered: responseFor
        })
            .then(res => {
                setShowEmojiPicker(false);
                setComment('');
                Keyboard.dismiss();
                Notification.showSuccessMessage('Thông báo', 'Gửi bình luận thành công');
                loadData(0);
                setTimeout(() => {
                    scrollViewRef.current.scrollToEnd({ animated: true });
                }, 2000);
            })
            .catch(err => console.log(err));
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Bình luận</Text>
                <TouchableOpacity style={styles.iconWrap} onPress={() => likeAction()}>
                    <FontAwesomeIcon size={24} icon={faThumbsUp} color={isLiked ? COLOR.icon : COLOR.text} />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <ScrollView
                    ref={scrollViewRef}
                    style={styles.scrollView}
                    contentContainerStyle={{ flexGrow: 1 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    onScroll={({ nativeEvent }) => {
                        if (isCloseToBottom(nativeEvent)) {
                            appendData();
                        }
                    }}
                >
                    {
                        listComments.map(item => (
                            <View key={item._id}>
                                <CommentComponent props={item} />
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
            <View style={styles.footer}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <TextInput
                        placeholder="Viết bình luận..."
                        style={styles.textInput}
                        value={comment}
                        onChangeText={(value) => setComment(value)}
                    />
                </TouchableWithoutFeedback>
                <TouchableOpacity style={styles.iconWrap} onPress={() => {
                    setShowEmojiPicker(!showEmojiPicker);
                    Keyboard.dismiss();
                }}>
                    <FontAwesomeIcon size={24} icon={faSmile} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconWrap} onPress={() => sendComment()}>
                    <FontAwesomeIcon size={24} icon={faPaperPlane} color={ COLOR.icon } />
                </TouchableOpacity>
            </View>
            {showEmojiPicker &&
                <View style={styles.emojiWrap} >
                    <EmojiSelector
                        showSearchBar={false}
                        category={Categories.emotion}
                        showHistory={false}
                        showTabs={false}
                        showSectionTitles={false}
                        onEmojiSelected={(emoji) => {
                            setComment(comment + emoji);
                        }}
                    />
                </View>
            }
        </View>
    );
}

export default Comment;