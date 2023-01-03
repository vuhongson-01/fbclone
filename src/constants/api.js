export const USER_API = {
    register: 'users/register',
    login: 'users/login',
    getUser: 'users/show',
    editProfile: 'users/edit',
    changePassword: 'users/change-password',
    setBlockUser: 'users/set-block-user'
}

export const POSTS_API = {
    create: 'posts/create',
    edit: 'posts/edit',
    getById: 'posts/show',
    delete: 'posts/delete',
    getList: 'posts/list',
    like: 'postLike/action',
    report: 'postReport/create'
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
    getFriends: 'friends/list'
}