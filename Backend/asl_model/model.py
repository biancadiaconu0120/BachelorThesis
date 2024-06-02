import torch.nn as nn


class HandLandmarkNet(nn.Module):
    def __init__(self, num_classes, input_size):
        super(HandLandmarkNet, self).__init__()
        layer_size1 = 512
        layer_size2 = 256

        self.fc1 = nn.Linear(input_size, layer_size1)
        self.bn1 = nn.BatchNorm1d(layer_size1)
        self.fc2 = nn.Linear(layer_size1, layer_size2)
        self.bn2 = nn.BatchNorm1d(layer_size2)
        self.fc3 = nn.Linear(layer_size2, num_classes)
        self.dropout = nn.Dropout(0.5)
        self.leaky_relu = nn.LeakyReLU(negative_slope=0.01)

    def forward(self, x):
        x = self.leaky_relu(self.bn1(self.fc1(x)))
        x = self.dropout(x)
        x = self.leaky_relu(self.bn2(self.fc2(x)))
        x = self.dropout(x)
        x = self.fc3(x)
        return x

    def initialize_weights(self):
        for m in self.modules():
            if isinstance(m, nn.Linear):
                nn.init.kaiming_normal_(m.weight, mode='fan_in', nonlinearity='leaky_relu')
                if m.bias is not None:
                    nn.init.constant_(m.bias, 0)
