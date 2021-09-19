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
        const url = props.board ? `/api/v1/boards/show/${props.board}?limit=${postLimit}&posts=${true}&filter=${props.filterValue}` : `/api/v1/posts/index?limit=${postLimit}&filter=${props.filterValue}`;
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => {
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
                <label><span className = "filter-label">Filter by : </span>
                    <select name = "filter" className = "form-select" value = {props.filterValue} onChange = {handleFilterChange}>
                        <option value = "newest">Newest</option>
                        <option value = "oldest">Oldest</option>
                    </select>
                </label>
                {fetchedPosts.map((el,i) => {
                    let likedPost = (props.currentUser ? el.liking_users.some((ele) => ele.id === props.currentUser.id) : false)
                return (
                <div className = "post" key = {"p" + i}>
                    <FeedPost postData = {el} currentUser = {props.currentUser} getPosts = {getPosts} likedPost = {likedPost} />
                </div>
            )
            })}
                <div className = "d-flex justify-content-center">
                    <button className = "btn btn-secondary load-more-posts-btn" onClick = {loadMorePosts}>Load more</button>     
                </div>
            </div> 
            : 
            <div>
                No posts to show.
            </div>}
        </div>)
     }

export default PostFeed;