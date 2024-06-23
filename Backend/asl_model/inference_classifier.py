import pickle

import cv2
import mediapipe as mp
import torch

from asl_model.hand_utils import preprocess_for_model
from asl_model.model import HandLandmarkNet


with open('asl_model/trained_models/label_encoder.pkl', 'rb') as f:
    le = pickle.load(f)

model = HandLandmarkNet(num_classes=48, input_size=42)
model.load_state_dict(torch.load('asl_model/trained_models/best_asl_model.pth'))
model.eval()

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=2, min_detection_confidence=0.3)
mp_drawing = mp.solutions.drawing_utils

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(frame_rgb)

    predicted_labels = []
    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)
            preprocessed_landmarks = preprocess_for_model(hand_landmarks)

            with torch.no_grad():
                prediction = model(preprocessed_landmarks)
                predicted_class = torch.argmax(prediction, dim=1)
                predicted_label = le.inverse_transform(predicted_class.cpu().numpy())[0]
                predicted_labels.append(predicted_label)


    for i, label in enumerate(predicted_labels):
        cv2.putText(frame, f'Hand {i + 1}: {label}', (10, 50 + (i * 30)), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    cv2.imshow('frame', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
