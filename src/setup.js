import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "9a8ccb5e03c541f89f3ec3d1daf09b69";
const token =
  "006e67979c34c1a44829ec2c144a542aed7IADKZhEKRHBi0K748rUCvxmkGXk5MM2gZL3bIvHrUfT222TNKL8AAAAAEAD+bihbM/JBYQEAAQBg8kFh";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
