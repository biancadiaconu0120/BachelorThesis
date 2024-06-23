import os

import cv2

# Directories
left_hand_data_dir = './data_left_hand'
right_hand_data_dir = './data_right_hand'
light_conditions = ['Natural', 'Dark', 'Artificial']
dataset_size = 100  # Total number of images per class

# letters, numbers, and specific words
letters = [chr(65 + i) for i in range(26)]  # A-Z
numbers = [str(i) for i in range(1, 10)]  # 1-9
specific_words = ["Calm down", "cover", "father", "fine", "help", "I'm", "I love you", "love", "mother", "pray",
                  "stand", "telephone", "time"]
specific_words = [word.lower() for word in specific_words]


def create_directories(categories, condition_dir):
    """Create directories for given categories under a specific condition."""
    for category in categories:

        dir_name = category.replace(" ", "_")
        path = os.path.join(condition_dir, dir_name)
        if not os.path.exists(path):
            os.makedirs(path)


def setup_directories(generate_letters, generate_numbers, generate_words):
    """Setup directories for letters, numbers, and specific words based on flags."""
    for condition in light_conditions:
        condition_left_hand_dir = os.path.join(left_hand_data_dir, condition)
        condition_right_hand_dir = os.path.join(right_hand_data_dir, condition)

        os.makedirs(condition_left_hand_dir, exist_ok=True)
        os.makedirs(condition_right_hand_dir, exist_ok=True)

        if generate_letters:
            create_directories(letters, condition_left_hand_dir)
            create_directories(letters, condition_right_hand_dir)
        if generate_numbers:
            create_directories(numbers, condition_left_hand_dir)
            create_directories(numbers, condition_right_hand_dir)
        if generate_words:
            create_directories(specific_words, condition_left_hand_dir)
            create_directories(specific_words, condition_right_hand_dir)


def capture_images_for_category(category, target_dir, cap):
    """Capture images for a given category."""

    category_dir_name = category.replace(" ", "_")
    target_class_dir = os.path.join(target_dir, category_dir_name)
    print(f'Collecting data for class "{category}". Press "Q" to start.')

    while True:
        ret, frame = cap.read()
        if not ret:
            continue

        frame = cv2.flip(frame, 1)
        cv2.putText(frame, f'Class "{category}": Press "Q" to start', (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 1,
                    (0, 255, 0), 2)
        cv2.imshow('frame', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    counter, frame_count = 0, 0
    while counter < dataset_size:
        ret, frame = cap.read()
        if not ret:
            continue

        frame = cv2.flip(frame, 1)
        frame_count += 1
        if frame_count % 5 == 0:  # Save only 1 frame out of every 5
            cv2.imwrite(os.path.join(target_class_dir, f'{counter}.jpg'), frame)
            counter += 1

        cv2.imshow('frame', frame)
        cv2.waitKey(1)


def capture_data(hand_selection, light_condition, generate_letters, generate_numbers, generate_words):
    """Capture data based on selected categories and conditions."""
    target_dir = os.path.join(left_hand_data_dir if hand_selection == 'L' else right_hand_data_dir, light_condition)
    cap = cv2.VideoCapture(0)

    if generate_letters:
        for letter in letters:
            capture_images_for_category(letter, target_dir, cap)
    if generate_numbers:
        for number in numbers:
            capture_images_for_category(number, target_dir, cap)
    if generate_words:
        for word in specific_words:
            capture_images_for_category(word, target_dir, cap)

    cap.release()


def main(generate_letters=True, generate_numbers=True, generate_words=True):
    """Main function to setup directories and capture data."""
    setup_directories(generate_letters, generate_numbers, generate_words)

    for light_condition in light_conditions:
        for hand_selection in ['L', 'R']:
            if light_condition == 'Natural' or light_condition == 'Dark':
                continue
            print(f"Ready to capture images for the {hand_selection} hand under {light_condition} lighting.")
            input(
                f"Press Enter to start capturing images for the {hand_selection} hand under {light_condition} lighting...")
            capture_data(hand_selection, light_condition, generate_letters, generate_numbers, generate_words)

    cv2.destroyAllWindows()


if __name__ == "__main__":
    main(generate_letters=False, generate_numbers=True, generate_words=True)
