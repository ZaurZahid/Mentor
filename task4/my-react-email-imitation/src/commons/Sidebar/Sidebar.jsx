import React,{useState} from 'react'
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
import { Draft, Sent, Inbox, MailDetail, NewMail } from '../../modules';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './Sidebar.css'

const { Sider, Header, Content } = Layout;

export function Sidebar() {
    const [theme,setTheme]=useState(false)
    const thema=theme===true?'dark':'light'
    return (
        <Layout>
            <Router>
                <Sider
                     style={{
                        /* overflow: "auto", */ 
                        marginTop:'87px',
                        marginLeft: '5px', 
                        height: '68%',
                        position: "fixed",
                        left: 0,  
                        background: 'white',
                        border: '3px solid blue' 
                    }}  
                    className={theme?"dark-theme":null}
                >
                 
                 <button type="button" onClick={()=>setTheme(!theme)} role="switch" aria-checked="true" style={{margin: '9px 19px 0'}} className={theme===true?"ant-switch":"ant-switch ant-switch-checked"} >
                     <span className="ant-switch-inner">{thema}</span>
                     </button>

                    <Menu>
                        
                            <Menu.Item key="1" >
                                <Icon type="copy" />
                                <span className="nav-text">Inbox</span>
                                <Link to='/inbox' />
                            </Menu.Item>

                        <Menu.Item key="2">
                            <Icon type="tag" />
                            <span className="nav-text">Sent</span>
                            <Link to="/sent" />
                        </Menu.Item>

                        <Menu.Item key="3">
                            <Icon type="file-text" />  
                            <span className="nav-text">Draft</span>
                            <Link to="/draft" />
                        </Menu.Item>

                        <Menu.Item key="4">
                            <Icon type="edit" />
                            <span className="nav-text">New Email</span>
                            <Link to="/new-mail" />
                        </Menu.Item>

                    </Menu>

                </Sider>

                <Layout style={{ marginLeft: 200 }}>
                    <Header className={theme?"dark-theme":null} style={{ background: "#fff", padding: 0}}>
                        <div
                            style={{
                                fontSize: "30px",
                                textAlign: "center",
                                fontWeight: "600", 
                                // position:"fixed",
                                // zIndex:999,
                                width:'100%',
                                height:'105%',  
                                border:'3px solid red'
                            }}
                        >
                            <Switch>
                                <Route exact path={['/inbox' , '/']} > <h1 style={{color:'grey'}}>Inbox </h1> </Route>
                                <Route path="/sent" > <h1  style={{color:'grey'}}>Sent</h1> </Route>{/* sent sehifesinde olanda headerde sent yazsin */}
                                <Route path="/drafts/:id"> <h1  style={{color:'grey'}}>Draft Detail</h1> </Route>
                                <Route path="/inbox/:id"> <h1  style={{color:'grey'}}>Inbox Detail</h1> </Route>
                                <Route path="/draft"> <h1  style={{color:'grey'}}>Draft</h1> </Route>
                                <Route path="/new-mail"> <h1  style={{color:'grey'}}>New mail</h1> </Route>
                                <Route path="/mail-detail"> <h1  style={{color:'grey'}}>Mail Detail</h1> </Route>
                            </Switch>
                        </div>
                    </Header>
                    <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
                        <div
                            className={theme?"dark-theme":null}
                            style={{
                                padding: 24,
                                background: "#fff",
                                border: "3px solid #14ff24" 
                            }}
                        >
                            <Switch>
                                <Route exact path={['/inbox' , '/']} component={Inbox} />
                                <Route path="/sent" component={Sent} />
                                <Route path="/draft" component={Draft} />
                                <Route path="/new-mail" component={NewMail} />
                                <Route path="/inbox/:id" component={MailDetail} />
                                <Route path="/drafts/:id" component={MailDetail} />
                            </Switch>
                        </div>
                    </Content>
                </Layout>
            </Router>
        </Layout>
    );
}
