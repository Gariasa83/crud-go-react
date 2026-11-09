import PropTypes from "prop-types";

export const Post = ({ post, selectPost, deletePost }) => {
  return (
    <div className="col">
      <div className="card h-100">
        <img
          src={post.imgUrl}
          className="card-img-top w-100"
          alt={post.title}
          style={{ aspectRatio: "4 / 3", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title text-break">{post.title}</h5>
          <p className="card-text text-break">{post.description}</p>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-info px-3 py-2"
              style={{ minWidth: 44, minHeight: 44 }}
              aria-label="Editar post"
              onClick={() => selectPost(post)}
            >
              <i className="fa-solid fa-pen-to-square" />
            </button>
            <button
              className="btn btn-danger px-3 py-2"
              style={{ minWidth: 44, minHeight: 44 }}
              aria-label="Eliminar post"
              onClick={() => deletePost(post.id)}
            >
              <i className="fa-solid fa-trash" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

Post.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        imgUrl: PropTypes.string
    }).isRequired,
    selectPost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
}
