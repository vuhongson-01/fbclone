import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native';
import { Avatar, View, Text, Image, TouchableOpacity } from 'react-native-ui-lib';
import { StyleCustom } from '../assets/styles';
import { Dimensions } from 'react-native';
import LikeIcon from '../assets/svg/like';
import CommentIcon from '../assets/svg/cmt';
import LikedIcon from '../assets/svg/liked';
import MenuIcon from '../assets/svg/menu';
import PostService from '../helper/services/PostService';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

StyleCustom();

const DetailPost = ({navigation, route}) => {
    const {post, avatar, username} = route.params;
    const [imgArray, setImgArray] = useState([]);

    const [likePost, setLikePost] = useState(route.params.post.like.length);
    const [comment, setComment] = useState(route.params.post.countComments);

    var [like, setLike] = useState('Like');
    var [likeImg, setLikeImg] = useState(<LikeIcon></LikeIcon>);

    useEffect(() => {
        console.log(route.params.post.images[0]);
        console.log(route.params.post.images.length);
        if(route.params.post.isLike) {
            setLike('Like ');
            setLikeImg(<LikedIcon></LikedIcon>);
        }
        else {
            setLike('Like');
            setLikeImg(<LikedIcon></LikedIcon>);
        }
    }, []);

    function changeLike() {
        if(like === 'Like') {
            setLike('Like ');
            setLikeImg(<LikedIcon></LikedIcon>);
            setLikePost(likePost+1);
        }
        else {
            setLike('Like');
            setLikeImg(<LikeIcon></LikeIcon>);
            setLikePost(likePost-1);
        }

        PostService.like(post._id);
    }



    return (
       <ScrollView bg-white style={{backgroundColor: '#fff'}}>
            <View paddingH-10>
                {/* ten nguoi dang */}
                <View flex-apply spread row center>
                    <View flex row paddingT-10>
                        <Avatar source={{uri:route.params.avatar}}
                        style={{width:40, height:40, borderRadius:5}}></Avatar>
                        <View marginL-8>
                            <Text h4>
                                {route.params.username}
                            </Text>
                            <Text style={{opacity: 0.5}}>
                                {route.params.post.createdAt}
                                {/* { setDateDiff(props.createdAt) } */}
                            </Text>
                        </View>
                    </View>

                    
                    <TouchableOpacity onPress={function() {console.log("menu touch");}}>
                        <MenuIcon></MenuIcon>
                    </TouchableOpacity>
                    
                </View>

                {/* content post */}
                <View paddingB-4 marginT-16
                style={{borderBottomWidth:1, borderColor: '#f0f0f1'}}>
                    <Text marginB-8 normalSize>
                        {route.params.post.described}
                    </Text>

                    <View flex-apply row spread>
                        <View flex-apply row center>
                            <LikedIcon style={{width:"50%", height:"50%"}}></LikedIcon>
                            <Text marginL-4>
                                {likePost}
                            </Text>                           
                        </View>
                        <View flex-apply row >
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
                    style={{width: '50%'}}
                    onPress={changeLike}>
                        <View>
                            {likeImg}
                        </View>
                        <Text marginL-4 style={{opacity:0.5}}>{like}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity flex-apply row center
                    style={{width: '50%', opacity:0.5}}
                      onPress={function() {
                        navigation.navigate('CommentPage', 
                        {
                            postId: route.params.post._id,
                        });
                    }}>
                        <CommentIcon></CommentIcon>
                        <Text marginL-4>Bình luận</Text>
                    </TouchableOpacity>
                </View>
            </View>

            
            <View>
                {route.params.post.images.map((element, key) => {
                    return (
                        <Image marginV-2
                        style={{height:200, width:windowWidth}}   
                        source={{uri:element}} 
                        key={key}    
                    />
                    );
                })}
            </View>
            
       </ScrollView>
    );
}

export default DetailPost;