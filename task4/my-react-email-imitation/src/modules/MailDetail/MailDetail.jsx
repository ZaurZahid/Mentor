import React, { useEffect } from 'react';
import { List, Card } from 'antd';
import { withRouter } from "react-router";
import {getSingleMail} from "../../store/mail";
import {connect} from "react-redux";
import "./Mail.css"

const data = [
    {
        name: "zzzz1",
        from: "zzzz1@gmail.com",
        time: "10:45PM",
        text : "Lorem Ipsum as their default model text, and a search forLorem Ipsum as their default model text, and a search for"
    },
];

const mapStateToProps= (store)=>{
    return {
        mail:store.single
    }
}



export const MailDetail = withRouter(connect(mapStateToProps,{getSingleMail})(props=> {

    useEffect(()=>{
        props.getSingleMail(props.match.params.id);
    },[])
    return (
        <List
            // style={{border: "3px solid #14ff24"}}
            grid={{
                gutter: 16,
            }}
            dataSource={data}
            renderItem={item => (
                <List.Item>
                    <Card 
                        title={'from: ' + item.name}
                    >
                        <b>Mail: {item.from} </b>
                        <br/> 
                        Time: <i>{item.time}</i>
                        <hr/>
                        <br/>
                        {item.text}
                    </Card>
                </List.Item>
            )}
        />
    );
}))
