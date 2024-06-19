const initialState = {
    Cart:{},
    User:{},
}


export function RootReducer(state=initialState,action){
    console.log("haa bhai hhhhhhhhhhhhhhhhh")
switch(action.type){
    case 'ADD_CART':
        state.Cart[action.payload[0]]=action.payload[1]
        console.log("Dataaaaa",state.Cart)
        return {Cart:state.Cart,User:state.User}

    case 'DELETE_CART' :
        delete state.Cart[action.payload[0]]   
        return {Cart:state.Cart,User:state.User}

    case 'ADD_USER' :
        state.User[action.payload[0]]=action.payload[1] 
        console.log("Dataaaaa",state.User)
        return {Cart:state.Cart,User:state.User}

    case 'DELETE_USER':
        delete state.User[action.payload[0]]  
        console.log("Delete ke baad user data",state.User)
        return {Cart:state.Cart,User:state.User}
    default:
        return {Cart:state.Cart,User:state.User}
}

}