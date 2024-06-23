import logging
import pickle
import cv2
import mediapipe as mp
import torch

from asl_model.hand_utils import preprocess_for_model
from asl_model.model import HandLandmarkNet


class InferenceService:
    def __init__(self):

        with open('asl_model/trained_models/label_encoder.pkl', 'rb') as f:
            self.le = pickle.load(f)

        self.model = HandLandmarkNet(num_classes=48, input_size=42)
        self.model.load_state_dict(torch.load('asl_model/trained_models/best_asl_model.pth'))
        self.model.eval()

        self.mp_hands = mp.solutions.hands
        self.hands = self.mp_hands.Hands(static_image_mode=False, max_num_hands=2, min_detection_confidence=0.3)

        logging.info("Successfully loaded the inference models.")

    def process_video(self, video_path: str):
        predicted_labels = []


        cap = cv2.VideoCapture(video_path)

        if not cap.isOpened():
            raise ValueError("Error opening video stream or file")

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = self.hands.process(frame_rgb)

            if results.multi_hand_landmarks:
                for hand_landmarks in results.multi_hand_landmarks:
                    preprocessed_landmarks = preprocess_for_model(hand_landmarks)

                    with torch.no_grad():
                        prediction = self.model(preprocessed_landmarks)
                        predicted_class = torch.argmax(prediction, dim=1)
                        predicted_label = self.le.inverse_transform(predicted_class.cpu().numpy())[0]
                        predicted_labels.append(predicted_label)


            if results.multi_hand_landmarks:
                for hand_landmarks in results.multi_hand_landmarks:
                    mp.solutions.drawing_utils.draw_landmarks(
                        frame, hand_landmarks, mp.solutions.hands.HAND_CONNECTIONS
                    )


            height, width = frame.shape[:2]
            desired_height = 700
            if height > desired_height:
                new_height = desired_height
                new_width = int((new_height / height) * width)
                frame = cv2.resize(frame, (new_width, new_height))

            cv2.imshow('Video Preview', frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        cap.release()
        cv2.destroyAllWindows()

        return predicted_labels
