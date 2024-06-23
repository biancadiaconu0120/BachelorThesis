import pickle

import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from torch.utils.data import DataLoader, TensorDataset

from hand_utils import l1_penalty, EarlyStopping
from model import HandLandmarkNet

with open('data_features.pickle', 'rb') as f:
    data_dict = pickle.load(f)

data = np.array(data_dict['data'], dtype=np.float32)
labels = np.array(data_dict['labels'])


le = LabelEncoder()
labels_encoded = le.fit_transform(labels)
num_classes = len(le.classes_)


with open('label_encoder.pkl', 'wb') as f:
    pickle.dump(le, f)

data = torch.tensor(data, dtype=torch.float32)
labels_encoded = torch.tensor(labels_encoded, dtype=torch.long)

# Split the dataset into training+validation and test sets
x_train_val, x_test, y_train_val, y_test = train_test_split(data, labels_encoded, test_size=0.1, random_state=42)

# Further split the training+validation set into training and validation sets
x_train, x_val, y_train, y_val = train_test_split(x_train_val, y_train_val, test_size=0.2,
                                                  random_state=42)


train_data = TensorDataset(x_train, y_train)
val_data = TensorDataset(x_val, y_val)
test_data = TensorDataset(x_test, y_test)

train_loader = DataLoader(train_data, batch_size=32, shuffle=True)
val_loader = DataLoader(val_data, batch_size=32, shuffle=False)
test_loader = DataLoader(test_data, batch_size=32, shuffle=False)

model = HandLandmarkNet(num_classes=num_classes, input_size=42)
model.initialize_weights()

criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=1e-3, weight_decay=1e-5)
scheduler = optim.lr_scheduler.ReduceLROnPlateau(optimizer, mode='min', factor=0.1, patience=10, verbose=True)

epochs = 300
lambda_l1 = 1e-5
best_val_loss = float('inf')

early_stopping = EarlyStopping(patience=10, min_delta=0.001)
for epoch in range(epochs):
    model.train()
    for i, (inputs, labels) in enumerate(train_loader):
        inputs = inputs.view(inputs.size(0), -1)  # Flatten the inputs
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, labels) + l1_penalty(model, lambda_l1)
        loss.backward()
        optimizer.step()

    # Validation phase
    model.eval()
    val_loss = 0
    with torch.no_grad():
        for inputs, labels in val_loader:
            inputs = inputs.view(inputs.size(0), -1)
            outputs = model(inputs)
            val_loss += criterion(outputs, labels).item()
        val_loss /= len(val_loader)
    scheduler.step(val_loss)

    print(f'Epoch {epoch + 1}/{epochs}, Training Loss: {loss.item()}, Validation Loss: {val_loss}')

    if val_loss < best_val_loss:
        best_val_loss = val_loss
        torch.save(model.state_dict(), 'best_asl_model.pth')

    # Early stopping
    early_stopping(val_loss)
    if early_stopping.early_stop:
        print("Early stopping triggered!")
        break

print("Training complete.")

# Load the best model
model.load_state_dict(torch.load('best_asl_model.pth'))

# Evaluate the model on the test dataset
model.eval()
correct = 0
total = 0
with torch.no_grad():
    for inputs, labels in test_loader:
        inputs = inputs.view(inputs.size(0), -1)
        outputs = model(inputs)
        _, predicted = torch.max(outputs.data, 1)
        total += labels.size(0)
        correct += (predicted == labels).sum().item()

print(f'Accuracy on the test set: {correct / total:.2%}')
