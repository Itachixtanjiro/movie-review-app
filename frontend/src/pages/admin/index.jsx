import React from 'react'
import { Tabs } from 'antd'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Admin() {
    const [activeTab, setActiveTab] = React.useState('1');
    const {user} = useSelector((state)=> state.users) ;
    const navigate = useNavigate();
  return (
    <div>
        {user ?.isAdmin ? (<Tabs defaultActiveKey='1' activeKey={activeTab} onChange={(key)=>{
            setActiveTab(key);
            navigate('/admin?tab=${key}');
        }}> 
        <Tabs.TabPane tab='Movies' key={"1"}>
                <Movies/>
            </Tabs.TabPane>
            <Tabs.TabPane tab='Artists' key={"1"}>
                <Artists/>
            </Tabs.TabPane>    
            <Tabs.TabPane tab='Users' key={"1"}>
                <Users/>
            </Tabs.TabPane>
        </Tabs>) : (<div>
            <div className="text-grey-600 text-md text-center mt-20">
                You are not authorised to access this page.
            </div>
        </div>)
        }
    </div>
  )
}

export default Admin