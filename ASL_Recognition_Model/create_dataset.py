import os
import pickle

from tqdm import tqdm

from hand_utils import process_image

left_hand_data_dir = './data_left_hand'
right_hand_data_dir = './data_right_hand'

data = []
labels = []


def process_sub_directory(parent_dir):
    lighting_conditions = [d for d in os.listdir(parent_dir) if os.path.isdir(os.path.join(parent_dir, d))]

    with tqdm(total=len(lighting_conditions), desc=f'Processing {parent_dir}', unit='condition') as pbar_outer:
        for lighting_condition in lighting_conditions:
            lighting_dir = os.path.join(parent_dir, lighting_condition)
            letters = [d for d in os.listdir(lighting_dir) if os.path.isdir(os.path.join(lighting_dir, d))]

            with tqdm(total=len(letters), desc=f'Condition: {lighting_condition}', unit='letter') as pbar_inner:
                for letter in letters:
                    letter_dir = os.path.join(lighting_dir, letter)
                    for img_file in os.listdir(letter_dir):
                        img_path = os.path.join(letter_dir, img_file)
                        if os.path.isfile(img_path) and img_file.lower().endswith(('.png', '.jpg', '.jpeg')):
                            hands_list = process_image(img_path)
                            if hands_list:
                                for hand_data in hands_list:
                                    data.append(hand_data)
                                    labels.append(letter)
                            else:
                                print(f"Skipped image: {img_path}")

                    pbar_inner.update(1)

            pbar_outer.update(1)


process_sub_directory(left_hand_data_dir)
process_sub_directory(right_hand_data_dir)

print(f"Total data points: {len(data)}, Total labels: {len(labels)}")
label_distribution = {label: labels.count(label) for label in set(labels)}
print("Label distribution:", label_distribution)

with open('data_features.pickle', 'wb') as f:
    pickle.dump({'data': data, 'labels': labels}, f)

print("Data processing and feature extraction complete.")
