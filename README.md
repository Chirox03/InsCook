# InsCook App

## Introduction
Welcome to InsCook, a platform designed for food enthusiasts to share their cooking recipes, engage with other users, and discover new culinary inspirations. Whether you're a seasoned chef or an amateur cook, InsCook provides a space for you to showcase your recipes, gather feedback, and explore a diverse range of dishes from around the world.

## Features
- **Recipe Sharing**: Share your favorite recipes with the community by creating detailed recipe posts.
- **Interaction**: Like, save, and comment on recipes to engage with other users and build a vibrant culinary community.
- **Discovery**: Explore an extensive collection of recipes contributed by fellow users, categorized for easy browsing.
- **Personalization**: Customize your profile, save favorite recipes, and receive personalized recipe recommendations based on your preferences.
- **Responsive Design**: Enjoy a seamless user experience across devices, thanks to the responsive design built on Next.js and Tailwind CSS.

## Technologies Used
- **Next.js**: A React framework for building server-side rendered and statically generated web applications.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs without writing traditional CSS.
- **Node.js**: A JavaScript runtime environment used for building scalable network applications.
## Requirements
- Node.js 18.17 or later.
- macOS, Windows (including WSL), and Linux
- Python 3.9
- Next.js 14

## Getting Started
### To run InsCook locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the front-end directory using `cd front-end`.
3. Install dependencies using `npm install`.
4. Run the development server using `npm run dev`.
5. Access the application in your web browser at `http://localhost:3000`.

### To run model for search API locally, follow these steps:
0. Go to model directory `cd model` and download [this file](https://drive.google.com/file/d/1IMvXlxF0cn9GR0N1Zw78oLkG_lvAT57A/view?usp=sharing)

1. Create and activate venv
```bash
python3 -m venv myenv
source myenv/bin/activate
```
Above line is for Linux. Using `myenv/Scripts/activate` to activate virtual environment in Window.

2. Install requirements
```bash
pip3 install --upgrade -r requirements.txt
```

3. Start sever
```bash
python app.py
``` 

## Team Members
- **Lê Hoài Thương**: Project Manager, Frontend Developer
- **Nguyễn Hoàng Hải**: Backend Developer
- **Trần Hữu Lộc**: Frontend Developer

## Contributing
We welcome contributions from the community to help improve InsCook. If you'd like to contribute, please follow these guidelines:
- Fork the repository.
- Create a new branch for your feature or bug fix.
- Commit your changes with descriptive commit messages.
- Push your changes to your fork.
- Submit a pull request to the main repository.

## Feedback and Support
If you have any questions, feedback, or encounter any issues while using InsCook, please feel free to reach out to us. Your input is valuable and helps us improve the platform for all users.


