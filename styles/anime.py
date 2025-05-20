from PIL import Image, ImageFilter
import sys

input_path = sys.argv[1]
output_path = sys.argv[2]

img = Image.open(input_path)
anime = img.filter(ImageFilter.CONTOUR)
anime.save(output_path)
