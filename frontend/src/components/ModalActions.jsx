import { Button, Form, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  title: "",
  description: "",
  imgUrl: "",
};

export const ModalActions = ({ show, handleClose, getPosts, isEdit, post }) => {
  const [formulario, setFormulario] = useState(isEdit ? post : initialState);


  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const savePost = async()=>{
    try {
        const {data} = await axios.post(
          "/posts", 
          formulario
        );

        Swal.fire({
          position: "center",
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        await getPosts();
        resetFormulario();
        handleClose();   
    } catch (error){
        console.log("error en savePost", error.message);
    }
  };

  const updatePost = async()=>{
    try {
        const {data} = await axios.put(
          `/posts/${post.id}`, 
          formulario
        );

        Swal.fire({
          position: "center",
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        await getPosts();
        resetFormulario();
        handleClose();   
    } catch (error){
        console.log("error en updatePost", error.message);
    }
  };

  const handleSubmit =async (e) => {
    e.preventDefault()
    try{
      isEdit ? await updatePost() : await savePost();
    } catch (error){
        console.log("error en handleSubmit", error.message);
    }
  };

  const resetFormulario = () => setFormulario(initialState);

  return (
    <Modal show={show} onHide={handleClose} fullscreen="sm-down">
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? "Editar Post" : "Crear Post"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
            {/* title */}
            <div className="mb-3">
                <label className="form-label">
                    Titulo
                    </label>    
                    <input type="text" 
                    className="form-control"
                    name="title" 
                    onChange={(e)=> handleChange(e)}
                    value={formulario.title}
                    autoFocus
                    required
                />
            </div>

            {/* description */}
            <div className="mb-3">
                <label className="form-label">
                  Descripción
                    </label>
                    <textarea rows={4}
                    className="form-control"
                    name="description"
                    onChange={(e)=> handleChange(e)}
                    value={formulario.description}
                    required
                />
            </div>

            {/* imgUrl */}
            <div className="mb-3">
                <label className="form-label">
                    Imagen
                    </label>    
                    <input type="text" 
                    className="form-control"
                    name="imgUrl" 
                    onChange={(e)=> handleChange(e)}
                    value={formulario.imgUrl}
                    required
                />
            </div>

            <Button type="submit" className="btn btn-primary">
                {
                  isEdit ? "Actualizar" : "Guardar"
                }
            </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

ModalActions.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
    isEdit: PropTypes.bool.isRequired,
    post: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      imgUrl: PropTypes.string
    }).isRequired,
};
   