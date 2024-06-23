import os

import cv2

# Set the path to your folder containing the images
folder_path = '../data_right_hand/Natural/U'
output_video_path = 'output_video.avi'

# Define the codec and create VideoWriter object
fourcc = cv2.VideoWriter_fourcc(*'XVID')
out = None

# Retrieve a list of image filenames
images = sorted(int(img.replace(".jpg", "")) for img in os.listdir(folder_path) if img.endswith(".jpg"))

fps = 12

for filename_int in images:
    filename = f"{filename_int}.jpg"

    img_path = os.path.join(folder_path, filename)
    frame = cv2.imread(img_path)

    # Initialize VideoWriter with the frame dimensions if not done
    if out is None:
        height, width, layers = frame.shape
        out = cv2.VideoWriter(output_video_path, fourcc, fps, (width, height))

    out.write(frame)

# Release the VideoWriter object
out.release()
print("Video created successfully!")
