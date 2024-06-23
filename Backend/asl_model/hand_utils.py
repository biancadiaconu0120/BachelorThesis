import cv2
import mediapipe as mp
import numpy as np
import torch
# Re
mp_hands = mp.solutions.hands
hands = mp.solutions.hands.Hands(static_image_mode=True, max_num_hands=2, min_detection_confidence=0.3)


def process_image(img_path):
    """
    Process an image to extract hand landmarks data for multiple hands.

    Args:
        img_path (str): Path to the image file.

    Returns:
        list: A list containing lists of processed landmark data for each hand.
    """
    img = cv2.imread(img_path)
    if img is None:
        return None
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = hands.process(img_rgb)
    hands_data = []

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            hands_data.append(process_landmarks(hand_landmarks))

    return hands_data if hands_data else None


def process_landmarks(hand_landmarks):
    """
    Process a single hand's landmarks to extract normalized landmark positions.

    Args:
        hand_landmarks (mediapipe.framework.formats.landmark_pb2.NormalizedLandmarkList): Landmarks for a single hand.

    Returns:
        list: Normalized landmark positions in a flattened list.
    """
    data_aux = []
    x_ = [lm.x for lm in hand_landmarks.landmark]
    y_ = [lm.y for lm in hand_landmarks.landmark]
    for lm in hand_landmarks.landmark:
        data_aux.append((lm.x - min(x_)) / (max(x_) - min(x_)))
        data_aux.append((lm.y - min(y_)) / (max(y_) - min(y_)))
    return data_aux


def preprocess_for_model(hand_landmarks):
    """
    Preprocess hand landmarks for input into a PyTorch model.

    Args:
        hand_landmarks (mediapipe.framework.formats.landmark_pb2.NormalizedLandmarkList): Landmarks for a single hand.

    Returns:
        torch.Tensor: A tensor suitable for input into a PyTorch model.
    """
    hand_data = process_landmarks(hand_landmarks)

    flattened_data = np.array(hand_data, dtype=np.float32).flatten()

    preprocessed_data = torch.tensor(flattened_data).unsqueeze(0)
    return preprocessed_data


def l1_penalty(model, lambda_l1):
    """
    Compute L1 penalty for regularization.

    Args:
    model (torch.nn.Module): The neural network model.
    lambda_l1 (float): The regularization strength.

    Returns:
    torch.Tensor: Computed L1 penalty.
    """
    l1_norm = sum(p.abs().sum() for p in model.parameters())
    return lambda_l1 * l1_norm


class EarlyStopping:
    def __init__(self, patience=10, min_delta=0):
        """
        Args:
            patience (int): Number of epochs to wait after min has been hit.
                            After this number, training stops.
            min_delta (float): Minimum change in the monitored quantity
                               to qualify as an improvement.
        """
        self.patience = patience
        self.min_delta = min_delta
        self.counter = 0
        self.best_loss = None
        self.early_stop = False

    def __call__(self, val_loss):
        if self.best_loss is None:
            self.best_loss = val_loss
        elif val_loss > self.best_loss - self.min_delta:
            self.counter += 1
            if self.counter >= self.patience:
                self.early_stop = True
        else:
            self.best_loss = val_loss
            self.counter = 0
