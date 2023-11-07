// src/Post.js
function PostHeader() {
    return (
      <thead>
        <tr>
          <th>Item</th>
          <th>Category</th>
          <th>User</th>
        </tr>
      </thead>
    );
  }
  
  function PostBody(props) {
    const rows = props.postData.map((row, index) => {
      return (
        <tr key={index}>
          <td>{row.item}</td>
          <td>{row.user}</td>
          <td>{row.category}</td>
      <td>
          <button>
              Post
          </button>
      </td>
        </tr>
      );
     }
    );
    return (
        <tbody>
          {rows}
         </tbody>
     );
  }
  
  function Post (props) {
    return (
      <table>
        <PostHeader />
        <PostBody postData={props.postData} 
            submitPost={props.submitPost} />
      </table>
    );
  }
  
  export default Post;
  