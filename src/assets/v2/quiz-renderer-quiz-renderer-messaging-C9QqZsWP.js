const QUIZ_RENDERER_MESSAGE_CHANNEL = "revenuehunt:quiz-renderer";
const postQuizRendererMessage = ({
  targetWindow,
  instanceId,
  rendererType,
  type,
  height
}) => {
  const message = {
    channel: QUIZ_RENDERER_MESSAGE_CHANNEL,
    source: "quiz-renderer",
    instanceId,
    rendererType,
    type,
    ...typeof height === "number" ? { height } : {}
  };
  targetWindow.postMessage(message, "*");
};
export {
  postQuizRendererMessage
};
