import { makeStyles } from "@mui/styles";

const productDetailsStyle = makeStyles({
    root:{
        width:'100%',
        height:'100%',
        background:'#ecf0f1',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    box:{
        width:'800px',
        background:'white',
        padding:10
    },
    displaybox:{
        width:'97%',
        background:'white',
        padding:10
    },
    center:{
        display:'flex',
        justifyContent:'center'
    }
})

export {productDetailsStyle}