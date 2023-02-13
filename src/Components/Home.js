import AddInterview from "./AddInterview";
import SignIn from "./SignIn";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const backgroundImageUrl = "/Images/skyscraper_building_architecture2.jpg";

const divStyle = {
  position: "fixed",
  backgroundImage: `url(${backgroundImageUrl})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "100vh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  objectFit: "contain",
};

const marginStyle = {
  margin: "10%",
};

const Home = () => {
  const { authState } = useContext(AuthContext);

  return (
    <div role="img" aria-label="Background image" style={divStyle}>
      {authState.status ? (
        <AddInterview style={marginStyle} />
      ) : (
        <SignIn style={marginStyle} />
      )}
    </div>
  );
};

export default Home;
