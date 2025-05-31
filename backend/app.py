import torch
import cv2
import numpy as np
import torch.nn as nn
import torch.nn.functional as F
import nibabel as nib
from flask import Flask, request
import os
import tempfile
from flask_cors import CORS
import base64

# Parameters
image_size = 128

device = torch.device("cpu")


# 1. Load the model weights
model_state = torch.load("model.pth", map_location=device)

conv1_1 = nn.Conv2d(1, 32, kernel_size=3, padding=1).to(device)
conv1_2 = nn.Conv2d(32, 32, kernel_size=3, padding=1).to(device)
conv2_1 = nn.Conv2d(32, 64, kernel_size=3, padding=1).to(device)
conv2_2 = nn.Conv2d(64, 64, kernel_size=3, padding=1).to(device)
conv3_1 = nn.Conv2d(64, 128, kernel_size=3, padding=1).to(device)
conv3_2 = nn.Conv2d(128, 128, kernel_size=3, padding=1).to(device)
pool = nn.MaxPool2d(2)

upconv2 = nn.ConvTranspose2d(128, 64, kernel_size=2, stride=2).to(device)
dec2_1 = nn.Conv2d(128, 64, kernel_size=3, padding=1).to(device)
dec2_2 = nn.Conv2d(64, 64, kernel_size=3, padding=1).to(device)
upconv1 = nn.ConvTranspose2d(64, 32, kernel_size=2, stride=2).to(device)
dec1_1 = nn.Conv2d(64, 32, kernel_size=3, padding=1).to(device)
dec1_2 = nn.Conv2d(32, 32, kernel_size=3, padding=1).to(device)
final_conv = nn.Conv2d(32, 1, kernel_size=1).to(device)

conv1_1.load_state_dict(model_state['conv1_1'])
conv1_2.load_state_dict(model_state['conv1_2'])
conv2_1.load_state_dict(model_state['conv2_1'])
conv2_2.load_state_dict(model_state['conv2_2'])
conv3_1.load_state_dict(model_state['conv3_1'])
conv3_2.load_state_dict(model_state['conv3_2'])
upconv2.load_state_dict(model_state['upconv2'])

dec2_1.load_state_dict(model_state['dec2_1'])
dec2_2.load_state_dict(model_state['dec2_2'])
upconv1.load_state_dict(model_state['upconv1'])
dec1_1.load_state_dict(model_state['dec1_1'])
dec1_2.load_state_dict(model_state['dec1_2'])
final_conv.load_state_dict(model_state['final_conv'])



def forward_unet(x):
    e1 = F.relu(conv1_1(x))
    e1 = F.relu(conv1_2(e1))
    p1 = pool(e1)

    e2 = F.relu(conv2_1(p1))
    e2 = F.relu(conv2_2(e2))
    p2 = pool(e2)

    b = F.relu(conv3_1(p2))
    b = F.relu(conv3_2(b))

    up2 = upconv2(b)
    d2 = torch.cat([up2, e2], dim=1)
    d2 = F.relu(dec2_1(d2))
    d2 = F.relu(dec2_2(d2))

    up1 = upconv1(d2)
    d1 = torch.cat([up1, e1], dim=1)
    d1 = F.relu(dec1_1(d1))
    d1 = F.relu(dec1_2(d1))

    out = torch.sigmoid(final_conv(d1))
    return out




app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "*"}})
CORS(app, origins=["http://localhost:8080"])

@app.route('/predict', methods=['POST'])
def upload_form():
    if 'nii_file' not in request.files:
        return {'error': 'No file uploaded'}, 400

    file = request.files['nii_file']
    if not file.filename.endswith('.nii.gz'):
        return {'error': 'File is not a .nii.gz file'}, 400

    with tempfile.NamedTemporaryFile(suffix='.nii.gz', delete=False) as tmp:
        file.save(tmp)
        tmp.flush()
        tmp_path = tmp.name
    try:
        img_nii = nib.load(tmp_path).get_fdata()
    except nib.filebasedimages.ImageFileError as e:
        os.remove(tmp_path)
        return {'error': f'Failed to load NII file: {str(e)}'}, 500
    os.remove(tmp_path)

    # Process the middle slice
    slice_idx = img_nii.shape[-1] // 2
    orig_slice = img_nii[:, :, slice_idx]
    orig_slice_norm = (orig_slice - np.min(orig_slice)) / (np.max(orig_slice) - np.min(orig_slice) + 1e-8)
    orig_img = (orig_slice_norm * 255).astype(np.uint8)
    orig_img_rgb = cv2.cvtColor(orig_img, cv2.COLOR_GRAY2RGB)

    new_img = cv2.resize(orig_slice, (image_size, image_size))
    new_img = (new_img - np.min(new_img)) / (np.max(new_img) - np.min(new_img) + 1e-8)
    new_img = torch.tensor(new_img, dtype=torch.float32).unsqueeze(0).unsqueeze(0).to(device)

    with torch.no_grad():
        pred = forward_unet(new_img)
        pred_mask = (pred.cpu().numpy()[0, 0] > 0.7).astype(np.uint8)

    pred_mask_resized = cv2.resize(pred_mask, (orig_slice.shape[1], orig_slice.shape[0]), interpolation=cv2.INTER_NEAREST)
    overlay = np.stack([orig_slice_norm]*3, axis=-1)
    overlay[pred_mask_resized == 1] = [1, 0, 0]
    overlay_img = (overlay * 255).astype(np.uint8)

    # Encode both images as base64
    _, orig_buf = cv2.imencode('.png', orig_img_rgb)
    _, overlay_buf = cv2.imencode('.png', cv2.cvtColor(overlay_img, cv2.COLOR_RGB2BGR))

    orig_b64 = base64.b64encode(orig_buf).decode('utf-8')
    overlay_b64 = base64.b64encode(overlay_buf).decode('utf-8')

    return {
        'original_image': f"data:image/png;base64,{orig_b64}",
        'overlay_image': f"data:image/png;base64,{overlay_b64}"
    }
    

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 4000))
    app.run(host='0.0.0.0', port=port)