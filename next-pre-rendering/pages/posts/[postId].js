import { useRouter } from 'next/router'
// since its for dynamic route, at build time html and json is generated for
// 1st 3 data only(getStaticPaths) and served to client and after that
// for other paramaeters requests like /5 , /8  html and json is generated at runtime 
// and served to client
function Post({ post }) {
  const router = useRouter()

  if (router.isFallback) { // if html page is not present this is a fallback
    return <div>Loading...</div>
  }
  return (
    <>
      <h2>
        {post.id} {post.title}
      </h2>
      <p>{post.body}</p>
    </>
  )
}
export default Post
export async function getStaticProps(context) {
  const { params } = context
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  )
  const data = await response.json()

  if (!data.id) {
    return {
      notFound: true // for fallbackt:true 
      // rendering wil render 404 page if data is not found
    }
  }

  console.log(`Generating page for /posts/${params.postId}`)
  return {
    props: {
      post: data
    }
  }
}

// indicating to generate 3 htmls at build time. This is required for dynamic paths
export async function getStaticPaths() {
  return {
    paths: [
      { params: { postId: '1' } },
      { params: { postId: '2' } },
      { params: { postId: '3' } }
    ],
    fallback: true
  }
}
