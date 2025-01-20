# Chat Review with AI

## Overview
This is a web application where users log in with their Steam ID to write game reviews. The reviews are moderated using a sentiment analysis model to detect bullying or inappropriate language.

---

## Features
- Login with Steam ID.
- Post and moderate game reviews.
- AI-powered sentiment analysis ensures positive interactions.




---

## Sentiment Analysis Model
- The model is trained to detect bullying and inappropriate content.
- *Training Code*: Located in Sentiment_Analysis.ipynb.
- *Inference Code*: Use inference.py to run the model.
- *Dependencies*: Requires transformers and torch.
- *Model*: Download it from [Google Drive](https://drive.google.com/file/d/1ORwU7rbRlBK6J452RYw7xgfO8W7TZPES/view?usp=sharing).
- Dataset: The dataset used for training the model was created specifically for this project.

### Running the Model
1. Install dependencies:
   bash
   pip install torch transformers
   
2. Use the inference.py script to run the model and analyze input reviews.
   bash
   python inference.py
   

---

## Usage
1. Open proj.html in a browser.
2. Log in with Steam ID.(steam id login api has not been implemented,working on integrating steam api)
3. Post reviews, which are analyzed by the AI model for moderation.

---

## Acknowledgements
- Google Drive for hosting the model.
- OpenAI for sentiment analysis inspiration.
