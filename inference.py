from transformers import BertTokenizer, BertForSequenceClassification
import torch


tokenizer = BertTokenizer.from_pretrained('give the file path here') #give file path of the model,the model is in the google drive
model = BertForSequenceClassification.from_pretrained('give the file path here') #give file path of the model,the model is in the google drive


def predict_sentiment(text):
    
    inputs = tokenizer(text, return_tensors='pt', padding=True, truncation=True, max_length=512)

    
    with torch.no_grad():
        outputs = model(**inputs)

    logits = outputs.logits
    predicted_class_id = logits.argmax().item()

    label_mapping = {0: 'negative', 1: 'positive'}
    predicted_label = label_mapping[predicted_class_id]

    return predicted_label

test_sentences = [
    "You are a shity player.",
    "This is the worst experience I've ever had.",
    "The service was okay, but the food was delicious.",
    "I am not happy with the delivery time.",
    "Bro you are the best.",
    "I love this product! It's amazing."
]

for sentence in test_sentences:
    print(f"Sentence: {sentence}")
    print(f"Predicted Sentiment: {predict_sentiment(sentence)}\n")


