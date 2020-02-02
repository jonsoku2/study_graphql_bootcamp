import { PubSub } from 'graphql-yoga'

const Subscription = {
    count: {
        subscribe(parent, args, { pupsub }, info) {
            let count = 0

            setInterval(() => {
                count++
                pupsub.publish('count', {
                    count,
                })
            }, 1000)

            return pupsub.asyncIterator('count')
        },
    },
    comment: {
        subscribe(parent, { postId }, { db, pupsub }, info) {
            const post = db.posts.find(post => post.id === postId && post.published)
            if (!post) {
                throw new Error('Post not found')
            }

            return pupsub.asyncIterator(`comment ${postId}`) // "example : comment 44"
        },
    },
}

export { Subscription as default }
