import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import {useState} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const CreatePost = () => {
  const navigate = useNavigate();

  function handleChange(e){
    return setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }


  function htmlToText(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent.replace(/\u00A0/g, " ") // cambia nbsp por espacio normal
    .trim();
};

  // PARA EL BOTON PUBLICAR
  async function handleSubmit(e) {
    e.preventDefault();

    //DEFINICION DEL SLUG
    const post = {
      ...formValues,
      slug: formValues.title.toLowerCase().split(" ").join("-")
    }

    // AÑADO POST A LA DB
    await axios.post("http://localhost:3000/posts", post);

    navigate('/');
  }



  const [formValues, setFormValues] = useState({
      id: "",
      title: "",
      slug: "",
      desc: "",
      img: "https://picsum.photos/seed/react/800/400",
      category: "General",
      isFeatured: true,
      user: {
        _id: "0",
        username: "Administrador",
        img: "https://i.pravatar.cc/48"
      },
      content: ""
  });


  return (
  <section className="min-h-screen bg-violet-100 px-6 py-10">
    <div className="max-w-6xl mx-auto">
    
      <form onSubmit={handleSubmit}>
    
        {/* texto arriba */}
        <p className="text-gray-700 mb-6 text-lg">
          Crear un nuevo post
        </p>
    
        {/* titulo */}
        <input
          type="text"
          placeholder="Mi historia increíble"
          className="w-full bg-transparent outline-none text-5xl font-bold placeholder:text-gray-400 mb-10"
          name="title"
          onChange={handleChange}
          required
        />
  
        {/* categoria */}
        <div className="flex items-center gap-4 mb-8">
          <label className="text-lg font-medium">
            Elige una categoría:
          </label>
    
          <select 
          className="bg-white px-5 py-3 rounded-xl shadow-md outline-none min-w-55"
          name="category"
          onChange={handleChange}
          required
          >
            <option value="General">General</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Diseño">Diseño</option>
            <option value="Programación">Programación</option>
          </select>
        </div>
    
        {/* descripcion */}
        <textarea
          placeholder="Una breve descripción"
          rows="3"
          className="w-full bg-white rounded-2xl shadow-md p-5 resize-none outline-none mb-8"
          name="desc"
          onChange={handleChange}
          required
        />
  
        {/* editor */}
        <div className="h-90 pb-10 mb-6">
          <ReactQuill
            theme="snow"
            className="h-full"
            name="content"
            id="content"
            onChange={(value) => setFormValues({...formValues, content: htmlToText(value)})}
            required
          />
        </div>
    
        {/* boton publicar */}
        <button
          type="submit"
          className="bg-blue-700 text-white px-10 py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
        >
          Publicar
        </button>
    
      </form>
    
    </div>
  </section>
  );
};

export default CreatePost;