import React, { useEffect, useState } from "react";
import {
    View,
    Incubator,
    Button
} from 'react-native-ui-lib';
import { Text } from "react-native";
const { TextField } = Incubator;
import PostService from "../helper/services/PostService";

const testEmoji = (emojiValue) => {
    const requestBody = {
        userId: '639d7d5c6154fc205ceee48b',
        described: emojiValue,
        images: [],
        videos: []
    };
    PostService.create(requestBody)
        .then(res => {
            console.log(res.data.data.described)
        })
        .catch(err => console.log(err));
}

const EmojiTest = () => {
    const [emojiValue, setEmojiValue] = useState();
    const [post, setPost] = useState();
    const [afterCreate, setAfterCreate] = useState();

    useEffect(() => {
        PostService.getList()
            .then(res => {
                console.log(res.data.data);
                setPost(res.data.data[6].described);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <View>
            <TextField
                fieldStyle={{ borderBottomWidth: 1, padding: 2 }}
                containerStyle={{ border: 1, borderRadius: 10 }}
                placeholder="Họ tên"
                floatingPlaceholder
                onChangeText={(value) => {
                    setEmojiValue(value)
                }}
                enableErrors
                validate={['required', 'text']}
                validateOnBlur
                validationMessage={['Field is required', 'Name is invalid']}
                maxLength={30}
            />
            <Text> {emojiValue} </Text>
            <Text> { post } </Text>
            <Text> { afterCreate } </Text>
            <View marginT-20>
                <Button
                    borderRadius={50}
                    label="Đăng ký"
                    onPress={() => testEmoji(emojiValue)}
                />
            </View>
        </View>
    )
}

export default EmojiTest;