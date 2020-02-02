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
}

export { Subscription as default }
