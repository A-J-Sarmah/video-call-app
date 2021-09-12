import { useState, useEffect } from "react";
import {
  config,
  useClient,
  useMicrophoneAndCameraTracks,
  channelName,
} from "../setup.js";
import Audio from "./Audio.js";
import Video from "./Video.js";

export default function VideoCallApp({ setInCall }) {
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  let AppInitializer = async (name) => {
    client.on("user-published", async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      if (mediaType === "video") {
        setUsers((prevUsers) => {
          return [...prevUsers, user];
        });
      }
      if (mediaType === "audio") {
        user.audioTrack.play();
      }
    });

    client.on("user-unpublished", (user, mediaType) => {
      if (mediaType === "audio") {
        if (user.audioTrack) user.audioTrack.stop();
      }
      if (mediaType === "video") {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      }
    });

    client.on("user-left", (user) => {
      setUsers((prevUsers) => {
        return prevUsers.filter((User) => User.uid !== user.uid);
      });
    });

    try {
      await client.join(config.appId, name, config.token, null);
    } catch (error) {
      console.log("error");
    }

    if (tracks) await client.publish([tracks[0], tracks[1]]);
    setStart(true);
  };
  useEffect(() => {
    if (ready && tracks) {
      try {
        AppInitializer(channelName);
      } catch (error) {
        console.log(error);
      }
    }
  }, [channelName, client, ready, tracks]);
  return (
    <>
      {ready && tracks && (
        <Audio tracks={tracks} setStart={setStart} setInCall={setInCall} />
      )}
      {start && tracks && <Video tracks={tracks} users={users} />}
    </>
  );
}
