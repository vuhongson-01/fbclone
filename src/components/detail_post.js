import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native';
import { Avatar, View, Text, Image, TouchableOpacity } from 'react-native-ui-lib';
import { StyleCustom } from '../assets/styles';
import { Dimensions } from 'react-native';
import CommentIcon from '../assets/svg/cmt';
import PostService from '../helper/services/PostService';
import { faThumbsUp as faSolidThumbsUp, faCircleExclamation, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { setDateDiff } from '../utils/utils';
import { COLOR } from '../constants/constants';
import Notification from '../utils/Notification';
import { Dialog, Input } from '@rneui/themed';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

StyleCustom();

const DetailPost = ({ navigation, route }) => {
    const { post, avatar, username } = route.params;
    const [likePost, setLikePost] = useState(0);
    const [comment, setComment] = useState(0);
    const [like, setLike] = useState(false);
    const [reportDialogVisible, setReportDialogVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        setLikePost(parseInt(post.likes.length));
        setComment(parseInt(post.countComments));
        if (post.isLike) {
            setLike(true);
        }
    }, []);

    function changeLike() {
        if (like) {
            setLike(false);
            setLikePost(likePost - 1);
        }
        else {
            setLike(true);
            setLikePost(likePost + 1);
        }
        PostService.like(post.id);
    }

    const toggleReportDialog = () => {
        setReportDialogVisible(!reportDialogVisible);
    };

    const sendReport = () => {
        setIsSending(true);
        if (title.length <= 0 || desc.length <= 0) {
            setIsSending(false);
            return;
        }
        PostService.report(post.id, {
            subject: title,
            details: desc,
        })
            .then(res => {
                Notification.showSuccessMessage('Gửi báo cáo thành công.');
                setDesc('');
                setTitle('');
                toggleReportDialog();
            })
            .catch(error =>
                Notification.showErrorMessage('Đã xảy ra lỗi khi gửi báo cáo.'),
            )
            .finally(() => setIsSending(false));
    };

    return (
        <>
            <ScrollView bg-white style={{ backgroundColor: '#fff' }}>
                <View paddingH-10>
                    {/* ten nguoi dang */}
                    <View flex-apply spread row center>
                        <TouchableOpacity style={{ marginLeft: 5, marginRight: 20 }} onPress={() => navigation.goBack()}>
                            <FontAwesomeIcon size={28} icon={faArrowLeft} />
                        </TouchableOpacity>
                        <View flex row paddingT-10>
                            <Avatar source={{ uri: avatar }}
                                style={{ width: 40, height: 40, borderRadius: 5 }}></Avatar>
                            <View marginL-8>
                                <Text h4>
                                    {username}
                                </Text>
                                <Text>
                                    {setDateDiff(post.createdAt)}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={toggleReportDialog}>
                            <FontAwesomeIcon
                                icon={faCircleExclamation}
                                size={18}
                                color={COLOR.mainBlack}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* content post */}
                    <View paddingB-4 marginT-16
                        style={{ borderBottomWidth: 1, borderColor: '#f0f0f1' }}>
                        <Text marginB-8 normalSize>
                            {post.described}
                        </Text>

                        <View flex-apply row spread>
                            <View flex-apply row>
                                <View flex-apply row center style={{ padding: 5, backgroundColor: COLOR.icon, borderRadius: 50 }}>
                                    <FontAwesomeIcon
                                        icon={faSolidThumbsUp}
                                        size={12}
                                        color={COLOR.background}
                                    />
                                </View>
                                <Text marginL-4>{likePost} lượt thích</Text>
                            </View>
                            <View flex-apply row>
                                <Text>
                                    {comment}
                                </Text>
                                <Text marginL-4>bình luận</Text>
                            </View>
                        </View>
                    </View>

                    {/* like + comment */}
                    <View flex-apply row spread marginV-10>
                        <TouchableOpacity flex-apply row center
                            style={{ width: '50%' }}
                            onPress={changeLike}>
                            <FontAwesomeIcon
                                icon={like ? faSolidThumbsUp : faThumbsUp}
                                size={24}
                                color={like ? COLOR.icon : COLOR.text}
                            />
                            <Text marginL-4 style={{ color: like ? COLOR.icon : COLOR.text }}>Thích</Text>
                        </TouchableOpacity>

                        <TouchableOpacity flex-apply row center
                            style={{ width: '50%' }}
                            onPress={function () {
                                navigation.navigate('CommentPage',
                                    {
                                        postId: post.id,
                                    });
                            }}>
                            <CommentIcon></CommentIcon>
                            <Text marginL-4>Bình luận</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View>
                    {post.images.map((element, key) => {
                        return (
                            <Image marginV-2
                                style={{ height: 200, width: windowWidth }}
                                source={{ uri: element }}
                                key={key}
                            />
                        );
                    })}
                </View>

            </ScrollView>
            <Dialog
                isVisible={reportDialogVisible}
                onBackdropPress={toggleReportDialog}>
                <Dialog.Title
                    title="Báo cáo bài viết"
                    titleStyle={{
                        fontFamily: 'Roboto',
                        fontSize: 22,
                        fontWeight: 'bold',
                        color: COLOR.text,
                    }}
                />
                {
                    <View>
                        <View>
                            <Text style={{ color: COLOR.text, fontSize: 20 }}>Tiêu đề</Text>
                            <Input
                                placeholder="Nhập tiêu đề..."
                                placeholderTextColor={COLOR.placeholder}
                                errorMessage="Hãy nhập tiêu đề"
                                errorStyle={{
                                    color: title.length > 0 ? COLOR.background : 'red',
                                }}
                                onChangeText={value => setTitle(value)}
                            />
                        </View>
                        <View>
                            <Text style={{ color: COLOR.text, fontSize: 20 }}>Mô tả</Text>
                            <Input
                                placeholder="Nhập mô tả..."
                                placeholderTextColor={COLOR.placeholder}
                                errorMessage="Hãy nhập mô tả"
                                errorStyle={{ color: desc.length > 0 ? COLOR.background : 'red' }}
                                onChangeText={value => setDesc(value)}
                            />
                        </View>
                    </View>
                }
                <Dialog.Actions>
                    <Dialog.Button
                        title={!isSending ? 'Gửi' : 'Đang gửi...'}
                        onPress={sendReport}
                    />
                    <Dialog.Button
                        title="Hủy"
                        onPress={toggleReportDialog}
                        titleStyle={{ color: 'red' }}
                    />
                </Dialog.Actions>
            </Dialog>
        </>
    );
}

export default DetailPost;