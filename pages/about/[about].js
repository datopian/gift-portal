import React from 'react'

import { Remarkable }  from 'remarkable'
import { getAbout, getAllAbout } from '../../lib/about-utils'
import markdownStyles from '../../styles/Markdown.module.css'

function About({content, data, isEmpty}){

  let md = new Remarkable()

  if(isEmpty){
    return <div>404</div>
  }else{
    return (
      <article className="max-w-2xl mx-auto mt-20">
        <div>
          <div >Title:  <span className='text-black-1000 font-bold p-5 m-2'>{data.title}</span></div>
          <div >date:  <span className='text-black-1000 font-thin p-5 m-2'>{data.date}</span></div>
          <div >author: <span className='text-black-1000 font-thin p-5 m-2'>{data.author}</span></div>
        </div>
        
        <div className='mt-10'>
          <div 
            className={markdownStyles['markdown']}
            dangerouslySetInnerHTML={{ __html: md.render(content) }}/>
        </div>
      </article>
      
    )
  }
  
}

export async function getStaticProps({ params }) {
  const aboutProps = getAbout(params.about)

  return {
    props : {content: aboutProps.content,
      data: aboutProps.data,
      isEmpty: aboutProps.isEmpty
    }
  }
}

export async function getStaticPaths(){
  const abouts = getAllAbout()
  return {
    paths: abouts.map((about) => {
      return {
        params : {
          about : about.split('.md')[0]
        }
      }
    }),
    fallback: false,
  }
}

export default About