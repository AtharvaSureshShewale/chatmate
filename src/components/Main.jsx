import React, { useState,useRef, useEffect } from 'react'
import gptLogo from '../assets/logo.svg'
import addBtn from '../assets/add-30.png'
import msgIcon from '../assets/message.svg'
import home from '../assets/home.svg'
import saved from '../assets/bookmark.svg'
import rocket from '../assets/rocket.svg'
import sendBtn from '../assets/send.svg'
import '../App.css';
import userIcon from '../assets/user-icon.png'
import gptImgLogo from '../assets/blue_logo.svg'
import { sendMsgToAI } from '../openai'

export default function Main() {

    const msgEnd=useRef(null);

    const [input,setInput]=useState("");
    const [messages,setMessages]=useState([
        {
            text:'Hi, I am ChatMATE, large language model developed by Google.I am designed to understand and generate human-like text.',
            isBot:true,
        }
    ]);

    useEffect(()=>{
        msgEnd.current.scrollIntoView();
    },[messages])

    const handleSend=async()=>{
        const text=input;
        setInput('');
        setMessages([
            ...messages,
            {text,isBot:false}
        ])
        const res=await sendMsgToAI(text);
        setMessages([
            ...messages,
            {
                text,
                isBot:false
            },
            {
                text:res,
                isBot:true,
            }
        ]);
    }

    const handleEnter=async(e)=>{
        if(e.key==='Enter') await handleSend();
    }

    const handleQuery=async(e)=>{
        const text=e.target.value;
        setMessages([
            ...messages,
            {text,isBot:false}
        ])
        const res=await sendMsgToAI(text);
        setMessages([
            ...messages,
            {
                text,
                isBot:false
            },
            {
                text:res,
                isBot:true,
            }
        ]);
    }

  return (
    <div className='Main'>
        <div className="sideBar">
            <div className="upperSide">
                <div className="upperSideTop">
                    <img src={gptLogo} alt="Logo" className="logo" />
                    <span className="brand">ChatMATE</span>
                </div> 
                    <button className="midBtn" onClick={()=>{window.location.reload()}}><img src={addBtn} alt="new chat" className='addBtn'/>New Chat</button>
                    <div className="upperSideBottom">
                        <button className='query' onClick={handleQuery} value={"What is Programming ?"}><img src={msgIcon} alt="Query" />What is Programming ?</button>
                        <button className='query' onClick={handleQuery} value={"How to use an API ?"}><img src={msgIcon} alt="Query" />How to use an API ?</button>
                    </div> 
            </div>
            <div className="lowerSide">
                <div className="listItems"><img src={home} alt="" className="listItemsImg" />Home</div>
                <div className="listItems"><img src={saved} alt="" className="listItemsImg" />Saved</div>
                <div className="listItems"><img src={rocket} alt="" className="listItemsImg" />Upgrade</div>
            </div>
        </div>
        <div className="main">
            <div className="chats">

                {
                    messages.map((message,i)=>
                        <div key={i} className={message.isBot?"chat bot":"chat"}>
                        <img className='chatImg' src={message.isBot?gptImgLogo:userIcon} alt="" /><p className="txt">{message.text}</p>
                        </div>
                    )
                }
                <div ref={msgEnd}/>
            </div>
            
            <div className="chatFooter">
                <div className="inp">
                    <input type="text" placeholder='Send a message' value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}}/>
                    <button className="send" onClick={handleSend}><img src={sendBtn} alt="" /></button>
                </div>
                <p>ChatMATE may produce inaccurate information about people, places, or facts.</p>
            </div>
        </div>
    </div>
  )
}
