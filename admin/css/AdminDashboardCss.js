import { makeStyles } from "@mui/styles";
 const adminStyle = makeStyles({


    leftBarStyle:{
        display:"flex",
        flexDirection:'column',
        justifyContent:"center",
        alignItems:"center",
       
   },

   nameStyle:{
    fontFamily:'Poppins',
    fontSize:10,
    color:'#636e72'
 },

 phoneStyle:{
    fontFamily:'Poppins',
    fontSize:10,
    color:'#636e72'
 },

 emailStyle:{
    fontFamily:'Poppins',
    fontSize:10,
    color:'#636e72'
 },

 menuStyle:{
    fontFamily:'Poppins',
    fontSize:10,
    fontWeight:10,
    display:'flex',
    justifyContent:'left',
    width:'300',
  
    // marginInline:'2px'
 },

 menuItemStyle:{
    fontFamily:'Poppins',
    fontSize:10,
   display:'flex',
   alignItems:'center'
 },

});
export {adminStyle}