import { Tabs } from 'antd'
import React from 'react'
import Reviews from './Reviews'
import UserDetails from './UserDetails'

export default function Profile() {
  return (
    <Tabs defaultActiveKey='1'>
      <Tabs.TabPane tab="reviews" key='1'>
        <Reviews/>
      </Tabs.TabPane> 
      <Tabs.TabPane tab="Profile" key='2'>
        <UserDetails/>
      </Tabs.TabPane>
    </Tabs>
  )
}
