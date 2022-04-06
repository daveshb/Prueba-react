import React, { createContext, useContext } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  BrowserRouter,
} from "react-router-dom";
import "./styless.css";

const UserContex = createContext(null);

const Page1 = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div className="bg-black mini-container">
        <h2 className="text-white">My App </h2>
        <h2 className="text-white">page-1 </h2>
        <h2 className="text-white" onClick={() => navigate("/page2")}>
          page-2
        </h2>
      </div>
      <RegisterForm />
      <div className="bg-black mini-container"></div>
    </React.Fragment>
  );
};

const Page2 = () => {
  const navigate = useNavigate();
  const { setImageUrl } = useContext(UserContex);
  const [formState, setFormState] = React.useState({
    img: " ",
  });
  const { img } = formState;
  setImageUrl(img);

  const handleImputChange = ({ target }) => {
    setFormState({
      ...formState,
      [target.name]: target.value,
    });
  };

  return (
    <React.Fragment>
      <div className="bg-black mini-container">
        <h2 className="text-white">My App </h2>
        <h2 className="text-white" onClick={() => navigate("/")}>
          page-1
        </h2>
        <h2 className="text-white">page-2 </h2>
      </div>
      <div className="all-content">
        <h3 className="fw-bold"> Upload a profile photo</h3>
        <div className="mt-2">
          <h5>Email address</h5>
          <input
            name="img"
            type="text"
            value={img}
            onChange={handleImputChange}
            placeholder="Enter photo url"
          ></input>
        </div>

        <button
          className="btn btn-dark mt-4"
          onClick={() => {
            navigate("/img");
          }}
        >
          Submit
        </button>
      </div>
      <div className="bg-black mini-container"></div>
    </React.Fragment>
  );
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = React.useState({
    name: "",
    password: "",
  });
  const { name, password } = formState;
  const handleImputChange = ({ target }) => {
    setFormState({
      ...formState,
      [target.name]: target.value,
    });
  };

  const handleClick = () => {
    if (name === "david@peaku.co" && password === "123") {
      navigate("/page2");
    }
  };

  return (
    <React.Fragment>
      <div className="all-content">
        <h3 className="fw-bold"> Register with use</h3>
        <div className="mt-2">
          <h5>Email address</h5>
          <input
            name="name"
            type="text"
            value={name}
            onChange={handleImputChange}
          ></input>
        </div>
        <div>
          <h5>Password</h5>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handleImputChange}
          ></input>
        </div>
        <button className="btn btn-dark mt-4" onClick={handleClick}>
          Submit
        </button>
      </div>
    </React.Fragment>
  );
};

const ImgCard = () => {
  const { imageUrl } = useContext(UserContex);
  return (
    <React.Fragment>
      <img src={imageUrl} />
    </React.Fragment>
  );
};

const App = () => {
  const [imageUrl, setImageUrl] = React.useState();

  return (
    <React.Fragment>
      <UserContex.Provider value={{ imageUrl, setImageUrl }}>
        <Routes>
          <Route path="/" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/img" element={<ImgCard />} />
        </Routes>
      </UserContex.Provider>
    </React.Fragment>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
