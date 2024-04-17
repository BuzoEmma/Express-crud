import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { EdithTodo } from "./EdithTodo";

axios.defaults.baseURL = "http://localhost:5000" || "";

const App = () => {
  const [toggle, setToggle] = useState(false);
  const [dataList, setDataList] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [formDataEdith, setFormEdith] = useState({
    name: "",
    email: "",
    mobile: "",
    _id: " ",
  });

  const [formDataEdithSection, setFormDataEdithSection] = useState(false);

  const handleFormData = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData);
    console.log(data);
    if (data.data.success) {
      setToggle(false);
      getDate();
      alert(data.data.message);
      setFormData({
        name: "",
        email: "",
        mobile: "",
      });
    }
  };

  const getDate = async () => {
    const data = await axios.get("/");
    if (data.data.success) {
      setDataList(data);
    }
  };

  useEffect(() => {
    getDate();
  }, []);

  // delete data

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);
    if (data.data.success) {
      getDate();
      alert(data.data.message);
    }
  };

  //  Edit data

  const handleEdit = async (e) => {
    e.preventDefault();
    const data = await axios.put("/update", formDataEdith);
    if (data.data.success) {
      getDate();
      alert(data.data.message);
      setFormDataEdithSection(false);
    }
    console.log(data)
  };

  const handleEdithFormData = async (e) => {
    const { value, name } = e.target;
    setFormEdith((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAllFormDataEdith = (item) => {
    setFormEdith(item);
    setFormDataEdithSection(true);
  };

  return (
    <div className="container">
      <div className="container-div">
        <div>
          <button
            className="add-btn"
            onClick={() => setToggle((prev) => !prev)}
          >
            Add Task
          </button>
        </div>

        {toggle && (
          <EdithTodo
            handleSubmit={handleSubmit}
            setToggle={() => setToggle((prev) => !prev)}
            handleFormData={handleFormData}
            formData={formData}
          />
        )}

        {formDataEdithSection && (
          <EdithTodo
            handleSubmit={handleEdit}
            setToggle={() => setFormDataEdithSection((prev) => !prev)}
            handleFormData={handleEdithFormData}
            formData={formDataEdith}
          />
        )}

        <div className="outcome">
          <h1>Todo List</h1>

          {dataList?.data?.data?.length > 0 ? (
            <table id="customers">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {dataList && (
                <tbody>
                  {dataList.data.data.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.mobile}</td>
                      <td>
                        <button onClick={() => handleAllFormDataEdith(item)}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(item._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          ) : (
            <h1>No Data On The List</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
