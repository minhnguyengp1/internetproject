import React from 'react'
import MainPicture from '../../components/Article/MainPicture';
import './article.scss';
import ProfilInfo from '../../components/Article/ProfilInfo';




export const Article = () => {
  return (
     
   
    
    <div className='mainPage'>
            <h1> Hallo, das ist dein Artikel </h1>
           
           
           <div className='test1'>
            <MainPicture></MainPicture>
            <ProfilInfo></ProfilInfo>
           </div>
            
    </div>
    

   

  )
}

export default Article;