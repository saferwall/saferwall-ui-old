export default function middlewarePipeline(context: any, middleware: any, index: number) {
    const nextMiddleware = middleware[index]

    if (!nextMiddleware) {
        return context.next
    }

    return () => {
        const nextPipeline = middlewarePipeline(
            context, middleware, index + 1
        )

        nextMiddleware({ ...context, next: nextPipeline })

    }
}
