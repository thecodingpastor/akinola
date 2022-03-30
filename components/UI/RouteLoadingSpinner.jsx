import Spin from "./Spin";
const RouteLoadingSpinner = () => {
  return (
    <Spin
      style={{
        position: "fixed",
        top: "7rem",
        left: "50%",
        transform: "translateX(-50%, -50%)",
        zIndex: 20,
      }}
    />
  );
};

export default RouteLoadingSpinner;
