import React, { useEffect } from 'react'
import { List,Typography } from 'antd';
import {   Link } from "react-router-dom";

import {connect} from "react-redux";

import {getDraftMails} from "../../store/mail";
 
/*  const data = [
     {
        id: 1,
        name: "zzzz",
        from: "zzzz@gmail.com",
        to: "adam@gmail.com",
        time: "15:45",
        text: "You can save your message as a draft to be completed and sent at a later time. Draft messages are saved in your Draft folder until you send them or delete them from the folder. You can enable a preference to automatically save your email as a draft while you are composing the message."
    },

    {
        id: 2,
        name: "zzzz2",
        from: "zzzz2@gmail.com",
        to: "adam@gmail.com",
        time: "15:46",
        text: "You can save your message as a draft to be completed and sent at a later time. Draft messages are saved in your Draft folder until you send them or delete them from the folder. You can enable a preference to automatically save your email as a draft while you are composing the message."
    },

    {
        id: 3,
        name: "zzzz3",
        from: "zzzz3@gmail.com",
        to: "adam@gmail.com",
        time: "15:47",
        text: "You can save your message as a draft to be completed and sent at a later time. Draft messages are saved in your Draft folder until you send them or delete them from the folder. You can enable a preference to automatically save your email as a draft while you are composing the message."
    } 
]; 
   */

const mapStateToProps= (store)=>{
    return {
      draft:store.drafts
    }
  }

export const Draft = connect(mapStateToProps,{getDraftMails})((props)=> {

    useEffect(()=>{
        props.getDraftMails();
    },[])
    return (
       
            <List 
                size="large"
                bordered
                dataSource={props.draft  /*data */}
                renderItem={item => (
                    <List.Item>
                        <Typography.Text mark>[{item.name}]</Typography.Text> <Link to={"/drafts/"+item.id}>{item.text}</Link>
                        <span style={{color:'green',fontSize:'18px'}}>[{item.time}]</span>
                    </List.Item>
                )}
            />
       
    );
})
