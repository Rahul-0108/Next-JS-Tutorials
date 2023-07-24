import User from '../components/user'
function UserList({ users }) {
  return (
    <>
      <h1>List of users</h1>
      <button onClick={() => console.log("1 ")}>"Test</button >
      {
        users.map(user => {
          return (
            <div key={user.id}>
              <User user={user} />
            </div>)
        })
      }
    </>)
}
export default UserList;
// In dev mode, build is created once we make a change on the server and on each request html page is generated
// (using the components and fetching data and pass to the component as props) and served 
//  js features (like button events code like above) will be served in separate js files to the client and will not 
//  be part of the generated html
export async function getStaticProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()
  console.log(new Date());
  return {
    props: {
      users: data
    }
  }
}
