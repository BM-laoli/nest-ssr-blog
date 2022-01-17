import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'


export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

// 首先是 动态路由匹配 getStaticPaths  也可以从一些别的服务器来获取数据 比如说一个文章管理系统
// ⚠️ 它是build time阶段运行的
export async function getStaticPaths() {  
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

// 然后说获取数据
export async function getStaticProps({ params }) {
  const postData = await  getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}
