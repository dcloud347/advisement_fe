import React from 'react';
import {Button, Result} from 'antd';
import cookie from 'react-cookies';
import axios from './axios';

class Logout extends React.Component {
    async componentDidMount() {
        await axios.get('/auth/logout/')
        cookie.remove('user', {path: '/'})
    }

    render() {
        return (
            <div>
                <div style={{marginTop: "5%", marginBottom: document.body.clientWidth > 750 ? "13%" : "40%"}}>
                    <Result
                        status="success"
                        title="You have successfully logged out"
                        extra={[
                            <a href="/user-login">
                                <Button type="primary" key="console">
                                    Login
                                </Button>
                            </a>]
                        }
                    />
                </div>
            </div>
        )
    }
}


export default Logout;
