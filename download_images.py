import os
import requests
from urllib.parse import urlparse

def download_image(url, save_path):
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        with open(save_path, 'wb') as f:
            f.write(response.content)
        print(f"Downloaded: {save_path}")
    except Exception as e:
        print(f"Error downloading {url}: {e}")

# Create directories if they don't exist
os.makedirs("public/images/services", exist_ok=True)
os.makedirs("public/images/logos", exist_ok=True)

# Image URLs and their corresponding save paths
images = {
    # Hero background
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1920&h=1080": "public/images/hero-bg.jpg",
    
    # Service images
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800&h=600": "public/images/services/home.jpg",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800&h=600": "public/images/services/travel.jpg",
    "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800&h=600": "public/images/services/food.jpg",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800&h=600": "public/images/services/fashion.jpg",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800&h=600": "public/images/services/education.jpg",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800&h=600": "public/images/services/logistics.jpg",
    "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=800&h=600": "public/images/services/health.jpg",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=600": "public/images/services/business.jpg",
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&q=80&w=800&h=600": "public/images/services/consulting.jpg",
    "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=800&h=600": "public/images/services/games.jpg",
    
    # Logo images
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=100&h=100": "public/images/logos/home-logo.jpg",
    "https://images.unsplash.com/photo-1596561260970-66b794b3888c?auto=format&fit=crop&q=80&w=100&h=100": "public/images/logos/travel-logo.jpg",
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=100&h=100": "public/images/logos/food-logo.jpg",
    "https://images.unsplash.com/photo-1508742345712-0656a285ac31?auto=format&fit=crop&q=80&w=100&h=100": "public/images/logos/fashion-logo.jpg",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=100&h=100": "public/images/logos/education-logo.jpg",
    "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=100&h=100": "public/images/logos/logistics-logo.jpg",
    "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&q=80&w=100&h=100": "public/images/logos/health-logo.jpg",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=100&h=100": "public/images/logos/business-logo.jpg",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=100&h=100": "public/images/logos/consulting-logo.jpg",
    "https://images.unsplash.com/photo-1535572290543-960a8046f5af?auto=format&fit=crop&q=80&w=100&h=100": "public/images/logos/games-logo.jpg",
}

# Also use one of the business images as default fallbacks
download_image(
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=600",
    "public/images/services/default.jpg"
)
download_image(
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=100&h=100",
    "public/images/logos/default-logo.jpg"
)

# Download all images
for url, save_path in images.items():
    download_image(url, save_path)
