import { useState } from "react";
import VideoCallApp from "./Components/VideoCallApp";

function App() {
  const [joined, setJoined] = useState(false);
  if (!joined) {
    return (
      <>
        <nav className="navbar navbar-dark bg-dark">
          <div className="ms-3">
            <p className="navbar-brand m-0">Video Call App</p>
          </div>
        </nav>
        <main className="mt-5">
          <p className="display-3 mt-5 text-center">Hello There :)</p>
          <p className="text-muted text-center display-5 mt-3">
            Please Click Start to join the Meeting
          </p>
          <div className="button text-center mt-5">
            <button
              className="btn btn-warning px-5 my-5"
              onClick={() => {
                setJoined(true);
              }}
            >
              Start
            </button>
          </div>
        </main>
      </>
    );
  } else {
    return <VideoCallApp setInCall={setJoined} />;
  }
}

export default App;
