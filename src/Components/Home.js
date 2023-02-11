import AddInterview from "./AddInterview";
import SignIn from "./SignIn";

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
  return (
    <div role="img" aria-label="Background image" style={divStyle}>
      {/* <SignIn style={marginStyle} /> */}
      <AddInterview style={marginStyle} />
    </div>
  );
};

export default Home;
