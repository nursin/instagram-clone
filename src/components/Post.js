import { Avatar } from '@material-ui/core'
import React from 'react'
import '../styles/Post.css'

function Post({username, caption, imageUrl, avatarUrl}) {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt=''
                    src={avatarUrl}
                />
                <h3>{username}</h3>
            </div>
            {/* Header -> Avatar + username*/}

            <img className="post__image" src={imageUrl} alt="" />
            {/* image */}

            <h4 className="post__text"><strong>{username}</strong> {caption}</h4>
            {/* username + caption */}
        </div>
    )
}

export default Post
