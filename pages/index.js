import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import Layout from "../components/Layout";
import utilStyle from "../styles/utils.module.css"
import { getPostsData } from '@/lib/post';
import { siteTitle } from '@/components/Layout';

const inter = Inter({ subsets: ['latin'] })


export async function getStaticProps(){
  const allPostsData = getPostsData();

  return{
    props: {
      allPostsData,
    },
  };
}

export default function Home({allPostsData}) {
  return(
    <Layout home>
      <Head>
        <title>
          {siteTitle}
        </title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>
          このブログは学生が理想の身体を作るために必要な情報をアップロードしています
        </p>
      </section>

      <section>
        <h2>社会人トレーニーのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({id,title,date,thumbnail}) =>(
            <article key={id}>
             <Link href={`/posts/${id}`}>
                <img src={thumbnail}
                className={styles.thumbnailImage}
                />
             </Link>
            <Link href={`/posts/${id}`} passHref legacyBehavior>
              <a className={utilStyle.boldText}>
              {title}
              </a> 
            </Link>                 
             <br />
             <small className={utilStyle.lightText}>
             {date}
              </small>
            </article>
            ))}
       </div>
      </section>
    </Layout>

);
}

   