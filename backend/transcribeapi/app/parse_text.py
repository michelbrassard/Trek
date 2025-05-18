import cv2
import pytesseract
from pytesseract import Output

def parse_text(image):
    # Load image
    img = cv2.imread(image)

    # Preprocess: grayscale + binary threshold
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY_INV)

    # Optional: dilation to connect text lines (useful for tables)
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2))
    dilated = cv2.dilate(thresh, kernel, iterations=1)

    # Extract structured data
    data = pytesseract.image_to_data(dilated, output_type=Output.DICT)

    # Draw bounding boxes and print structured output
    n_boxes = len(data['text'])
    structured_data = []
    for i in range(n_boxes):
        text = data['text'][i].strip()
        if text:  # skip empty results
            (x, y, w, h) = (data['left'][i], data['top'][i], data['width'][i], data['height'][i])
            structured_data.append({
                'text': text,
                'x': x,
                'y': y,
                'width': w,
                'height': h,
                'line_num': data['line_num'][i],
                'block_num': data['block_num'][i]
            })
            # Visualize bounding box
            cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 1)

    # Print structured info
    for item in structured_data:
        print(item)