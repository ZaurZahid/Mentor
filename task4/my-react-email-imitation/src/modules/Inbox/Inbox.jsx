import React, { useEffect } from 'react'
import { List,Typography } from 'antd';
import { Link } from "react-router-dom";
import   "./Inbox.css";

import {connect} from "react-redux";
import {getInboxMails} from "../../store/mail";

/*   const data = [
    {
       id: 1,
       name: "zzzz",
       from: "zzzz@gmail.com",
       to: "adam@gmail.com",
       time: "15:45",
       text: "Lorem Ipsum as their default model text, and a search forLorem Ipsum as their default model text, and a search for"
   },

   {
       id: 2,
       name: "zzzz2",
       from: "zzzz2@gmail.com",
       to: "adam@gmail.com",
       time: "15:46",
       text: "Lorem Ipsum as their default model text, and a search forLorem Ipsum as their default model text, and a search for"
   },

   {
       id: 3,
       name: "zzzz3",
       from: "zzzz3@gmail.com",
       to: "adam@gmail.com",
       time: "15:47",
       text: "Lorem Ipsum as their default model text, and a search forLorem Ipsum as their default model text, and a search for"
   } 
]; 
   */
const mapStateToProps= (store)=>{
    return {
        mails:store.mails
    }
}


export const Inbox = connect(mapStateToProps,{getInboxMails})( props => {

    useEffect(()=>{
        props.getInboxMails();
    },[])
    return (
        <div >
                <List
                    size="large"
                    bordered
                    dataSource={props.mails  /* data*/}//mailleri gotur reduxdan
                    renderItem={item => (
                        <List.Item>
                            <Typography.Text mark>[{item.name}]</Typography.Text> <Link to={"/inbox/"+item.id}>{item.text}<span style={{color:'blue',fontSize:'18px'}}>[{item.time}]</span></Link>
                        </List.Item>
                    )}
                />
        </div>
    )
});
