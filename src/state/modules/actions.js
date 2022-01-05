import axios from '@/services/axios'
import nProgress from 'nprogress';

export const actions = {
    doAction(_, { id, type, action }) {
        nProgress.start();
        return new Promise(done => {
            axios
                .post(
                    `${type}/${id}/${action}`
                ).then(data => {
                    nProgress.done(true);
                    done(data);
                });
        })

    },
    doLike(_, { id }) {
        return actions.doAction(_, { type: "files", id: id, action: "like" })
    },
    doUnLike(_, { id }) {
        return actions.doAction(_, { type: "files", id: id, action: "unlike" })
    },
    doFollow(_, { id }) {
        return actions.doAction(_, { type: "users", id: id, action: "follow" })
    },
    doUnFollow(_, { id }) {
        return actions.doAction(_, { type: "users", id: id, action: "unfollow" })
    }
}
