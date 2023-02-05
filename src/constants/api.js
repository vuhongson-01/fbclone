export const USER_API = {
    register: 'users/register',
    login: 'users/login',
    getUser: 'users/show',
    editProfile: 'users/edit',
    changePassword: 'users/change-password',
    setBlockUser: 'users/set-block-user',
    setBlockUserDiary: 'users/set-block-diary',
    search: 'users/search'
}

export const POSTS_API = {
    create: 'posts/create',
    edit: 'posts/edit',
    getById: 'posts/show',
    delete: 'posts/delete',
    getList: 'posts/list',
    like: 'postLike/action',
    report: 'postReport/create',
    search: 'posts/search'
}

export const POST_COMMENTS_API = {
    create: 'postComment/create',
    getAll: 'postComment/list'
}

export const FRIEND_API = {
    sendRequest: 'friends/set-request-friend',
    getRequests: 'friends/get-requested-friend',
    action: 'friends/set-accept',
    remove: 'friends/set-remove',
    getFriends: 'friends/list',
    getStatus: 'friends/status',
    cancelSendRequest: 'friends/cancel-send-request'
}

export const CHAT_API = {
    sendMessage: 'chats/send',
    getSingleChat: 'chats/getMessages',
    getAllChats: 'chats',
}