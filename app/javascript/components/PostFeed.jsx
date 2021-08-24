import React, {useEffect, useState} from "react";
import FeedPost from "./FeedPost";

const PostFeed = (props) => {
    const [fetchedPosts, setFetchedPosts] =  useState([]);
    const [postLimit, setPostLimit] = useState(5);
    const [currentFilter, setCurrentFilter] = useState("newest")

    useEffect(() => {
        getPosts();
    }, [postLimit])

    useEffect(() => {
        if (currentFilter !== props.filterValue) {
            setCurrentFilter(props.filterValue);
        }
    })

    useEffect(() => {
        if (postLimit === 5) {
            setPostLimit(postLimit + 1);
        } else {
            setPostLimit(5);
        }
    }, [currentFilter])

    const getPosts = () => {
        const url = `/api/v1/posts/index?limit=${postLimit}&filter=${props.filterValue}`;
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => {
              console.log(response)
            setFetchedPosts(response)
          })
          .catch(() => console.log("error"));
    }

    const loadMorePosts = () => {
        setPostLimit(postLimit + 5)
    }

    const handleFilterChange = (e) => {
        props.setFilterValue(e.target.value)
    }

    return (
        <div id = "postfeed">
            {fetchedPosts.length ? 
            <div>
                <label>Filter by:
                    <select name = "filter" value = {props.filterValue} onChange = {handleFilterChange}>
                        <option value = "newest">Newest</option>
                        <option value = "oldest">Oldest</option>
                    </select>
                </label>
                {fetchedPosts.map((el,i) => {
                return (
                <div className = "post" key = {"p" + i}>
                    <FeedPost postData = {el} currentUser = {props.currentUser} />
                </div>
            )
            })}
            <button onClick = {loadMorePosts}>Load more</button>     
            </div> 
            : 
            <div>
                No posts to show.
            </div>}
        </div>)
     }

export default PostFeed;