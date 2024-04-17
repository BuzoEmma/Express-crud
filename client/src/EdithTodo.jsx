import { MdClose } from "react-icons/md";

export const EdithTodo = ({ handleSubmit, setToggle, handleFormData, formData }) => {
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div className="close-icon" onClick={ setToggle}>
          <MdClose />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Your name"
            onChange={handleFormData}
            name="name"
            value={formData.name}
            id="name"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Your email"
            onChange={handleFormData}
            name="email"
            value={formData.email}
            id="email"
          />
        </div>
        <div>
          <label htmlFor="mobile">Mobile</label>
          <input
            type="number"
            placeholder="Your mobile"
            onChange={handleFormData}
            name="mobile"
            value={formData.mobile}
            id="mobile"
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
