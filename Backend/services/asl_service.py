import pickle
import cv2
import mediapipe as mp
import torch
import tempfile
import os
from asl_model.hand_utils import preprocess_for_model
from asl_model.model import HandLandmarkNet


class InferenceService:
    def __init__(self):
        # Load the LabelEncoder
        with open('asl_model/trained_models/label_encoder.pkl', 'rb') as f:
            self.le = pickle.load(f)

        self.model = HandLandmarkNet(num_classes=48, input_size=42)
        self.model.load_state_dict(torch.load('asl_model/trained_models/best_asl_model.pth'))
        self.model.eval()

        self.mp_hands = mp.solutions.hands
        self.hands = self.mp_hands.Hands(static_image_mode=False, max_num_hands=2, min_detection_confidence=0.3)

    def process_video(self, video_bytes: bytes):
        # Save the uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False) as tmp:
            tmp.write(video_bytes)
            tmp_path = tmp.name

        # Open the video file
        cap = cv2.VideoCapture(tmp_path)
        predicted_labels = []

        while True:
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

        cap.release()
        os.remove(tmp_path)

        return predicted_labels
