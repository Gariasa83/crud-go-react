import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ModalActions } from "../components/ModalActions";
import { Loading } from "../components/Loading";
import { Post } from "../components/Post";

const Home = () => {
  const [posts, setPosts] = useState([]); 
  const [isLoading, setIsLoading] = useState(true)
  const [isEdit, setIsEdit] = useState(false);
  const [post, setPost] = useState({});

  // ** state modal
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false); 
    setIsEdit(false)
  };
  const handleShow = () =>  setShow(true);

  const getPosts = useCallback(async()=>{
    try{
      setIsLoading(true)
      const {data} = await axios.get("/posts");
      setPosts(data.data)
      setIsLoading(false)
    } catch (error){
      setIsLoading(false)
      console.log(error.message)
    }
  },[])

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const { data } = await axios.get("/posts");
        setPosts(data.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false)
      }
    };
    loadPosts();
  }, []);
  
  const deletePost=async(id)=>{
    try{
      const {data} = await axios.delete("/posts/"+id);
      await getPosts()
      //console.log(data);
     Swal.fire({
      position: "center",
      icon: "success",
      title: data.message,
      showConfirmButton: false,
      timer: 1500
    });
    }catch(error){
      console.log("error en deletePost", error.message);
    }
  }

  const selectPost=(post)=>{
    setIsEdit(true);
    setPost(post)
    handleShow()
  }
    
  return <div className="container py-4 py-md-5">
    <div className="d-flex justify-content-center mb-4 mb-md-5">
      <button
        className="btn btn-info px-4 py-2"
        style={{ minHeight: 44 }}
        onClick={handleShow}
        aria-label="Agregar post"
      >
        <i className="fa-solid fa-plus fa-lg"></i>
      </button>
    </div>

    {isLoading ? (
      <Loading/>
    ): (
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3 g-md-4">
      {
        posts.map(post=>(
          <Post post={post} selectPost={selectPost} deletePost={deletePost} key={post.id}/>
        ))
      }
    </div>
    )}    
    <ModalActions 
      key={isEdit ? post.id : "nuevo"}
      show={show} 
      handleClose={handleClose} 
      getPosts={getPosts}
      isEdit={isEdit} 
      post={post}/>
  </div>
}

export default Home 