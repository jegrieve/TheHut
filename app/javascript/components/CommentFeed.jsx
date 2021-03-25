import React, {useState, useEffect} from "react";
import FeedComment from "./FeedComment"

const CommentFeed = (props) => { 
        const [loadedFeedComments, setLoadedFeedComments] = useState([]);
        const [cachedComments, setCachedComments] = useState([]);
        const [fetchedComments, setFetchedComments] = useState({offset: 0});

    useEffect(() => {
        if (loadedFeedComments.length > 0) {
            setFetchedComments({offset: fetchedComments['offset'] + 5})
        } 
    }, [loadedFeedComments])

    useEffect(() => {
        setCachedComments((prevState) => (
            [...prevState].concat(loadedFeedComments)
        ))
    }, [fetchedComments])

    useEffect(() => {
        getComments();
    }, [])

    const getComments = () => {
        const limit = 10;
        const id = props.params
        const url = `/api/v1/comments/index?id=${id}&limit=${limit}&offset=${fetchedComments['offset']}`;
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => {
              console.log(response);
            setLoadedFeedComments(response);
          })
          .catch(() => console.log("error"));
    }
    
     if (cachedComments.length > 0) {
        return (
            <div id = "commentfeed">
            {cachedComments.map((el,i) => {
            return (
                <div className = "comment" key = {i}>
                    <div>
                        <FeedComment body ={el.body} user = {el.user_id}/>
                    </div>
                </div>
            )
            })}
            <button onClick = {getComments}>Load more</button>
            </div>
        )}
        else {
            return (
                <div id = "commentfeed">
                    No comments to show.
                </div>
            )
        }
}

    


export default CommentFeed;

// const PostFeed = () => {

//     const getPosts = () => {
//         const limit = 5;
//         const url = `/api/v1/posts/index?limit=${limit}&offset=${fetchedPosts['offset']}`;
//         fetch(url)
//           .then(response => {
//             if (response.ok) {
//               return response.json();
//             }
//             throw new Error("Network response was not ok.");
//           })
//           .then(response => {
//             setLoadedFeedPosts(response)
//           })
//           .catch(() => console.log("error"));
//     }
    
//      if (cachedPosts.length > 0) {
//         return (
//             <div id = "postfeed">
//             {cachedPosts.map((el,i) => {
//             return (
//                 <div className = "post" key = {i}>
//                     <NavLink to={`/post/${el.id}`}>{el.id}</NavLink>
//                     <FeedPost id ={el.id} title ={el.title} body ={el.body} img ={el.image} />
//                 </div>
//             )
//             })}
//             <button onClick = {getPosts}>Load more</button>
//             </div>
//         )}
//         else {
//             return (
//                 <div id = "postfeed">
//                     <button onClick = {getPosts}>Get Posts</button>
//                     No posts to show.
//                 </div>
//             )
//         }
//      }




// export default PostFeed;