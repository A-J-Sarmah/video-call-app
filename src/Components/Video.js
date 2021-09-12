import React from "react";
import { AgoraVideoPlayer } from "agora-rtc-react";

function Video({ tracks, users }) {
  return (
    <>
      <div className="d-flex flex-column align-items-center mt-5">
        <AgoraVideoPlayer
          videoTrack={tracks[1]}
          style={{ height: "300px", width: "300px" }}
          class="mb-3"
        />
        {users.map((user) => {
          return (
            <AgoraVideoPlayer
              videoTrack={user.videoTrack}
              key={user.uid}
              style={{ height: "300px", width: "300px" }}
              class="mb-3"
            />
          );
        })}
      </div>
    </>
  );
}

export default Video;
