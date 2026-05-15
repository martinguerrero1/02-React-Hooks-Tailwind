import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import {useState} from 'react';

const CreatePost = () => {
  const [value, setValue] = useState("");

  return (
    <section className="min-h-screen bg-violet-100 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* texto arriba */}
        <p className="text-gray-700 mb-6 text-lg">
          Crear un nuevo post
        </p>

        {/* titulo */}
        <input
          type="text"
          placeholder="Mi historia increíble"
          className="w-full bg-transparent outline-none text-5xl font-bold placeholder:text-gray-400 mb-10"
        />

        {/* categoria */}
        <div className="flex items-center gap-4 mb-8">
          <label className="text-lg font-medium">
            Elige una categoría:
          </label>

          <select className="bg-white px-5 py-3 rounded-xl shadow-md outline-none min-w-[220px]">
            <option>General</option>
            <option>Tecnología</option>
            <option>Diseño</option>
            <option>Programación</option>
          </select>
        </div>

        {/* descripcion */}
        <textarea
          placeholder="Una breve descripción"
          rows="3"
          className="w-full bg-white rounded-2xl shadow-md p-5 resize-none outline-none mb-8"
        />

        {/* editor */}
        <div className="h-90 pb-10 mb-6">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="h-full"
          />
        </div>

        {/* boton */}
        <button className="bg-blue-700 text-white px-10 py-3 rounded-xl font-semibold hover:bg-blue-800 transition">
          Publicar
        </button>

      </div>
    </section>
  );
};

export default CreatePost;