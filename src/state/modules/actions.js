import axios from '@/services/axios'

export const state = {

}
export const actions = {
    doAction(_, { id, data, type }){
        return  axios
            .post(
                `${type}/${id}/actions`, 
                data
            );
    },
    doLike(_, { id }){
        return actions.doAction(_, {type: "files", id: id, data: { type: "like" }})
    },
    doUnLike(_, { id }){
        return actions.doAction(_, {type: "files", id: id, data: { type: "unlike" }})
    },
    doFollow(_, { id }){
        return actions.doAction(_, {type:"users", id: id, data : { type: "follow" }})
    },
    doUnFollow(_, { id }){
        return actions.doAction(_, {type:"users", id: id, data : { type: "unfollow" }})
    }
}
