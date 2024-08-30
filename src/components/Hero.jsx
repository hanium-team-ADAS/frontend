import React from 'react'
import { useNavigate } from 'react-router-dom'
import notionLogo from '../images/notion.png'
import githubLogo from '../images/github.png'
import '../styles/hero.css'

const Hero = () => {
  const navigate = useNavigate();

  const moveToAppt= () => {
    navigate('/appointment');
  }

  let heroData = {text1:'365일 비대면 진료가\n가능합니다',
    text2:'전문 의료인이 즉시 답해드립니다.\n내 위치와 상관없이 진료가 가능합니다.'}

  return (
    <div className='hero'>
        <div className='hero-text'>
          <p>{heroData.text1.split('\n').map((line, index) => <React.Fragment key={index}>{line}<br/></React.Fragment>)}</p>
        </div>
        <div className='sub-text'>
          <p>{heroData.text2.split('\n').map((line, index) => <React.Fragment key={index}>{line}<br/></React.Fragment>)}</p>
        </div>
        <div className='hero-button' onClick={moveToAppt}>
          <p>진료 예약</p>
        </div>
        <div className='logo'>
          <a href="https://www.notion.so" target="_blank" rel="noopener noreferrer">
            <img src={notionLogo} alt="Notion Logo" className='notion-logo'/>
          </a>
          <a href="https://github.com/hanium-team-ADAS" target="_blank" rel="noopener noreferrer">
            <img src={githubLogo} alt="Github Logo" className='github-logo'/>
          </a>
        </div>
    </div>
  )
}

export default Hero