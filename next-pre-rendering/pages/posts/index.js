import Link from 'next/link'

function PostList({ posts }) {
  return (
    <>
      <h1>List of Posts</h1>
      {posts.map(post => {
        return (
          <div key={post.id}>
            <Link href={`posts/${post.id}`}><h2>{post.id} {post.title}</h2></Link>
            <hr />
          </div>
        )
      })}
    </>
  )
}

export default PostList

export async function getStaticProps() {
  console.log('Generating / Regenerating postList')
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await response.json()
  return {
    props: {
      posts: data.slice(0, 3)
    },
    revalidate: 30 // after 30 secs if we make a request, then the staled html page is
    // returned and in the background new page is started to generate  by calling 
    // getStaticProps and from next request the new html page is server to client
  }
}
