import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Date from '../components/date'


export default function Home(props) {
  const { allPostsData } = props;

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>…</section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
          ))}
        </ul>
      </section>
      <hr />
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '})
          <Link href="/posts/first-post"><a >our Next.js tutorial</a></Link>
        </p>
      </section>
    </Layout>
  )
}
// =============================fetch相关====================================
// =============================1.部分 预渲染相关

// 1. 这个东西🈶那么一点点的坑哈
/**
 1.  只能在页面page级别使用，组件内部不允许使用
 2.  只有这个函数完之后，才会去在服务端内部进行reding，也就说最后输出给你用户的还是一个static的string
 3.  它是在build time 运行的
 说白了这个东西 就是一个存的静态展示只不过把静态的东西换成了资源请求，很鸡肋
 */
export async function getStaticProps() {
  
  const neProm = () => {
    return new Promise((resolve, reject) => {
      setTimeout( resolve(getSortedPostsData()) ,5000)
    })
  }
  const allPostsData = await neProm();

  return {
    props: {
      allPostsData
    }
  }
}


//2 . getServerSideProps这个就能做到请求时 进行 Server-side Rendering: 而不是 build  Rendering

// =============================混合渲染
// 1. 使用  Client-side Rendering ，混合渲染 ，它能把部分static的东西以static输出 也能把js的东西进行clinet渲染
// SWR 这个第三方的库static就是 ，做客户端req cache的东西 挺好用的 文档这里 https://swr.vercel.app/zh-CN，
// 建议使用SWR 和Next结合 比较官方说的 ，事出有因
