import React, { useEffect } from "react";
import { List, Typography } from "antd";
import {  Link } from "react-router-dom";
import { connect } from "react-redux";

import { getSentMails } from "../../store/mail";
/*    const data = [
    {
        id: 1,
        name: "zzzz",
        from: "zzzz@gmail.com",
        to: "adam@gmail.com",
        time: "15:45",
        text: "Delivery notification may take up to 12 hours. Failed – the message has been sent but the recipient's network is unable to deliver it."
    },

    {
        id: 2,
        name: "zzzz2",
        from: "zzzz2@gmail.com",
        to: "adam@gmail.com",
        time: "15:46",
        text: "Delivery notification may take up to 12 hours. Failed – the message has been sent but the recipient's network is unable to deliver it."
    },

    {
        id: 3,
        name: "zzzz3",
        from: "zzzz3@gmail.com",
        to: "adam@gmail.com",
        time: "15:47",
        text: "Delivery notification may take up to 12 hours. Failed – the message has been sent but the recipient's network is unable to deliver it."
    }
];  
   */
const mapStateToProps = store => {
    return {
        sent: store.sent
    };
};

export const Sent = connect(mapStateToProps, { getSentMails })(props => {
    useEffect(() => {
        props.getSentMails();
    }, []);

    // const { sent } = props;
    return (
        <List 
            size="large"
            bordered
            dataSource={ props.sent /*data*/  }
            renderItem={item => ( 
                <List.Item>
                    <Typography.Text mark>[{item.name}] </Typography.Text>
                    <Link to={"inbox/" + item.id}>{item.text} </Link>
               <span style={{color:'red',fontSize:'18px'}}>[{item.time}]</span> </List.Item>
            )}
        />
    );
});
