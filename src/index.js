import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {lazy, Suspense} from "react";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {AppstoreOutlined, LoadingOutlined} from '@ant-design/icons';
import reportWebVitals from './reportWebVitals';
import {Divider, Layout, Menu, Row, Col} from "antd";
const { Header, Content, Footer } = Layout;

const Home = lazy(() => import('./Home'));
const Login = lazy(() => import('./Login'));
const Logout = lazy(() => import('./Logout'));
const root = ReactDOM.createRoot(document.getElementById('root'));

const BioReactorMenu = ()=>{
    let navigate = useNavigate()
    return(
        <Menu
            theme="dark"
            mode="horizontal"
            items={[
                {
                    label: 'Home',
                    key: 'home',
                    icon: <AppstoreOutlined />,
                    onClick:()=> navigate('/')
                }]}
        />
    )
}


root.render(
    <Suspense fallback={
        <div style={{textAlign: "center", width: document.body.clientWidth, height: document.body.clientHeight * 0.45}}>
            <h1 style={{color: "#000080", fontFamily: "alibaba"}}>
                Loading......
            </h1>
            <Divider/>
            <LoadingOutlined style={{
                textAlign: "center", verticalAlign: "center",
                fontSize: "100px",
                marginTop: "30%",
                color: "skyblue",
            }}/>
        </div>}>
        <Layout className="layout">
            <BrowserRouter>
                <Header className="header" color={"light"}>
                    <Row>
                        <Col span={10}>
                            <BioReactorMenu />
                        </Col>
                        <Col span={4}>
                            <h1 style={{color:"white", margin:"auto"}}>Advisement App</h1>
                        </Col>

                    </Row>
                </Header>
                <Content style={{padding: '20px 50px 0 50px'}}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/user-login" element={<Login/>}/>
                        <Route path="/user-logout" element={<Logout/>}/>
                    </Routes>
                </Content>
            </BrowserRouter>
            <Footer style={{textAlign: 'center'}}>
                <span>&emsp;&emsp;&emsp;©2023 UCL Computer Science department GROUP 38</span>
            </Footer>
        </Layout>
    </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
