import React, {useState, useEffect} from "react";
import FeedComment from "./FeedComment"
import CreateComment from "./CreateComment"

const CommentFeed = (props) => { 
        const [loadedFeedComments, setLoadedFeedComments] = useState([]); 
        const [cachedComments, setCachedComments] = useState([]);
        const [fetchedComments, setFetchedComments] = useState({offset: 0});

    useEffect(() => { 
        if (loadedFeedComments === false) {
            setFetchedComments({offset: 0})
        } else if (loadedFeedComments.length > 0) {
            setFetchedComments({offset: fetchedComments['offset'] + 5})
        } 
    }, [loadedFeedComments])

    useEffect(() => {
        if (loadedFeedComments === false && fetchedComments.offset === 0) {
            setCachedComments([])
        } else {
            setCachedComments((prevState) => (
                [...prevState].concat(loadedFeedComments)
            ))
        }
    }, [fetchedComments])

    useEffect(() => {
        getComments();
    }, [])

    useEffect(() => {
        if (loadedFeedComments === false && fetchedComments.offset === 0) {
            getComments();
        }
    }, [cachedComments])

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

    return (
        <div>
            {cachedComments.length ? 
            <div id = "commentfeed">
            <CreateComment setLoadedFeedComments = {setLoadedFeedComments} params = {props.params} />
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
            : 
            <div id = "commentfeed">
                <CreateComment setLoadedFeedComments = {setLoadedFeedComments} params = {props.params} />
                No comments to show.
            </div>}
        </div>
    )
}

export default CommentFeed;
