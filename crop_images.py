from PIL import Image
import os
import glob

def crop_images(directory):
    files = glob.glob(os.path.join(directory, '*.png'))
    count = 0
    for f in files:
        try:
            img = Image.open(f)
            # Crop top 245 pixels
            if img.height > 300:
                cropped = img.crop((0, 245, img.width, img.height))
                cropped.save(f)
                count += 1
        except Exception as e:
            print(f"Failed to process {f}: {e}")
    print(f"Processed {count} images in {directory}")

crop_images('/Users/aabhasparakh/Desktop/kroolo/website-nextjs/public/images/mactus')
crop_images('/Users/aabhasparakh/Desktop/kroolo/website-nextjs/public/images/mactus/minerals')
