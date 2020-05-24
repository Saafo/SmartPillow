import {List, Avatar, Icon, Alert,Button} from 'antd';
import axios from 'axios';
import ReactDOM from 'react-dom';
import React from 'react';
import {withRouter, Redirect} from "react-router";
import {Link} from "react-router-dom";




// function _delete(id){
//     console.log(toString(id));
// }
//
// function _update(id) {
//     console.log(toString(id));
// }

const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);


class Device extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: false
        }
    }
componentWillMount() {
        const _this=this;
    window.listData = [];
    axios.post('/api/device',{"Action":"select","Token":localStorage.getItem('Token')},{headers: {'Content-Type': 'application/json'}}).then(function (response) {
        if (response.data.Data) {
            // console.log(response.data.Data);

            for (let i = 0; i < response.data.Data.length; i++) {
                // console.log(response.data.Data[i]);
                window.listData.push({
                    description: response.data.Data[i].DeviceID,
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    title:
                    response.data.Data[i].DeviceName,
                    content:
                        '',
                });
                _this.setState({data:true});
            }
        } else {
            console.log('failed');
        }
    }).catch(error => {
        if(error.response)
            if (error.response.status === 401) {
               console.log(401)
            }
    });
    console.log(window.listData[0]);
}

    render() {setTimeout(1000);
return (<div><Button type="default" shape="circle" icon="arrow-left" size="large"
                     style={{position: "relative", left: "2vw", top: "1vh"}}
                     onClick={
                         () => {
                             if (this.props.location.state) {
                                 this.props.history.push({
                                     pathname: "/login"
                                 });
                             } else {
                                 this.props.history.push({pathname: "/"});
                             }
                         }
                     }>
</Button>
    <h2 style={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
        top: "3vh"
    }}>设备列表
    </h2>
    <List style={{position:"relative",left:"3vw",width:"94%",top:"5vh"}}
    itemLayout="vertical"
    size="large"
    pagination={{
        onChange: page => {
            console.log(page);

        },
        pageSize: 3,
    }}
    dataSource={window.listData}
    renderItem={item => (
        <List.Item
            key={item.title}
            actions={[
                <Link to={{pathname: "/add_device"}}>
                    <Icon type="setting" onClick={()=>{window.device_id=item.description;window.device_name=item.title}}/></Link>,
                <Icon type="close-circle" onClick={()=>{axios.post('/api/device',{"Action":"delete","Token":localStorage.getItem('Token'),"Data":[{"DeviceID":item.description}]},{headers: {'Content-Type': 'application/json'}}).then(function (response) {
                    if (response.data.Token) {
                        console.log(2);
                        window.location.reload();
                    } else {
                        console.log(1);
                        window.location.reload();
                    }})}}/>,

            ]}
            extra={
                <img
                    width={100}
                    alt="logo"
                    src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2370081220,2159129501&fm=26&gp=0.jpg"
                />
            }
        >
            <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={item.title}
                description={item.description}
            />
            {item.content}
        </List.Item>
    )}
/><Link to={{pathname: "/add_device"}}>
    <Button type="primary" shape="circle" icon="plus" size="large" style={{
        width: "7vh",
        height: "7vh",
        boxShadow: "0vh 0.7vh 1vh #aaaaaa",
        position: "fixed",
        bottom: "3vh",
        right: "3vh",
        zIndex: 1
    }} onClick={function () {
        window.device_name="";
        window.device_id="";
    }}/>
</Link></div>);
}

}


export default withRouter(Device);