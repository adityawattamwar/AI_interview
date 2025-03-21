import React, { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export const SpeechInput = ({
  onSpeechResult,
  isListening,
  setIsListening,
}) => {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      onSpeechResult(transcript);
    }
  }, [transcript, onSpeechResult]);

  useEffect(() => {
    if (isListening) {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    } else {
      SpeechRecognition.stopListening();
    }
  }, [isListening, resetTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return null;
};
