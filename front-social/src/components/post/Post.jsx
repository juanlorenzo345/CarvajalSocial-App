import "./post.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";



export default function Post({post}) {
    const [like, setLike] = useState(post.likes.length)
    const [isLike, setIsLike] = useState(false)
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        setIsLike(post.likes.includes(currentUser._id));
      }, [currentUser._id, post.likes]);
    
      useEffect(() => {
        const fetchUser = async () => {
          const res = await axios.get(`/users?userId=${post.userId}`);
          setUser(res.data);
        };
        fetchUser();
      }, [post.userId]);

    const likeHandler = ()=>{
        try {
            axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
          } catch (err) {}
          setLike(isLike ? like - 1 : like + 1);
          setIsLike(!isLike);
        };
    
  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                <Link to={`/profile/${user.username}`}>
                      <img
                          className="postProfileImg"
                          src={
                              user.profilePicture
                                  ? PF + user.profilePicture
                                  : PF +"person/noAvatar.png"
                          }
                          alt=""
                      />
                </Link>
                    <span className="postUsername">{user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRigth">
                <MoreVertIcon/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img className="postImg" src={PF + post.img} alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
                    <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
                    <span className="postLikeCounter">{like} personas le gusta esto</span>
                </div>
                <div className="postBottomRigth">
                    <span className="postCommentText">{post.comment} comentarios</span>
                </div>
            </div>
        </div>
    </div>
  )
}
