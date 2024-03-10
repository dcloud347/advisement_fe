import {Component, useState} from "react";
import {Row, Col, Table, Button, Form, Modal, Input, Divider, message, Timeline} from "antd";
import axios from "./axios";


const SearchMedicationStatement = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const showModal = () => {
        setIsModalVisible(true)
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const onsubmit = (values) => {
        axios.get("/data-store/patients/save/",{params: values}).then(() => {
            message.success("Success",3)
        })
    }
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Search by patient ID
            </Button>
            <Modal title={"Search Medication Statement"} visible={isModalVisible} onOk={handleOk}
                   onCancel={handleCancel}>
                <Form
                    form={form}
                    name="search"
                    className="search-form"
                    onFinish={onsubmit}
                    scrollToFirstError
                >
                    <Form.Item
                        name="patient"
                        label={"Patient ID"}
                    >
                        <Input placeholder="Patient ID" size={"large"}/>
                    </Form.Item>
                    <Form.Item style={{fontSize: "15px"}}>
                        <Button type="primary" htmlType="submit" size="large"
                                block>
                            Search
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
const Chat = (param) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [chatID, setChatID] = useState(-1);
    const [messages, setMessages] = useState([]);
    const initialize = ()=>{
        message.info("Getting Advise")
        axios.post(`/data-store/medication-statement/${param.record.id}/start/`).then(r =>{
                let data=JSON.parse(JSON.stringify(messages))
                data.push({color:"green",children:r.data['result']})
                setMessages(data)
                setChatID(r.data['chat'])
                message.success("Get Advise Successfully",3)
            }
        ).catch(r =>{
            console.log(r)
        })
    }

    const showModal = () => {
        initialize()
        setIsModalVisible(true)
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const onsubmit = async (values) => {
        let data = JSON.parse(JSON.stringify(messages))
        data.push({color: "blue", children: values['message']})
        message.info("Replying", 3)
        await axios.post(`/data-store/chat/${chatID}/chat/`, values).then(r => {
            message.success("Success", 3)
            data.push({color: "blue", children: r.data})
        })
        setMessages(data)
    }
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Get advise
            </Button>
            <Modal title={"Advisor"} visible={isModalVisible} onOk={handleOk}
                   onCancel={handleCancel} width={1000}>
                <Timeline
                items={messages}
                />
                <Form
                    form={form}
                    name="search"
                    className="search-form"
                    onFinish={onsubmit}
                    scrollToFirstError
                >
                    <Form.Item
                        name="message"
                        label={"Message"}
                    >
                        <Input placeholder="Message" size={"large"}/>
                    </Form.Item>
                    <Form.Item style={{fontSize: "15px"}}>
                        <Button type="primary" htmlType="submit" size="large"
                                block>
                            Send
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default class Home extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data:[]
        }
    }
    get_info = ()=>{
        axios.get(`/data-store/medication-statement/`).then(response=>{
            for(let i=0;i<response.data.length;i++){
                response.data[i]['key'] = i+1
            }
            this.setState({data:response.data})
        })
    }
    componentDidMount() {
        this.get_info()
    }
    render() {
        const columns = [
            {
                title: 'Number',
                dataIndex: 'key',
                key: 'key',
                width: 150
            },
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: 150,
            },{
                title: 'Content',
                dataIndex: 'medication_statement',
                key: 'medication_statement',
                width: 150,
            },{
                title: 'Patient Name',
                dataIndex: 'patient_name',
                key: 'patient_name',
                width: 110,
            },{
                title: 'get advise',
                dataIndex: 'chat',
                key: 'chat',
                width: 60,
                render: (_,record)=> <Chat record = {record} />
            }
        ];
        return (
            <div>
                <Row>
                    <Col span={6} push={9}>
                        <h1>
                            Medication Statements
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} push={10}>
                        <SearchMedicationStatement />
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col>
                        <Table
                            columns={columns}
                            dataSource={this.state.data}
                            scroll={{y: 600}}
                            pagination={{
                                total: this.state.data.length,
                                defaultCurrent: 1,
                                defaultPageSize: 15,
                                showTotal: ((total) => {
                                    return `total ${total} items`;
                                }),
                                showQuickJumper: true,
                                pageSizeOptions: [10, 15, 20, 30, 50, 100, 500]
                            }}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}











