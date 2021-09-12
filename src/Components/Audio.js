import { useState } from "react";
import { useClient } from "../setup";

function Audio({ tracks, setStart, setInCall }) {
  const client = useClient();
  const [trackState, setTrackState] = useState({ video: true, audio: true });
  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };
  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((state) => {
        return { ...state, audio: !state.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((state) => {
        return { ...state, video: !state.video };
      });
    }
  };
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="mx-auto">
        <div className="navbar-brand m-0">
          <i
            className="fas fa-microphone-alt me-3"
            className={
              trackState.audio
                ? "fas fa-microphone-alt me-3"
                : "fas fa-microphone-alt me-3 text-danger"
            }
            onClick={() => {
              mute("audio");
            }}
          ></i>
          <i
            className={
              trackState.video
                ? "fas fa-video me-3"
                : "fas fa-video me-3 text-danger"
            }
            onClick={() => {
              mute("video");
            }}
          ></i>
          <i
            className="fas fa-sign-out-alt text-danger"
            onClick={leaveChannel}
          ></i>
        </div>
      </div>
    </nav>
  );
}

export default Audio;
