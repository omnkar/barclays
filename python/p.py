from transformers import pipeline

# Load contradiction detection model (DeBERTa)
nli_model = pipeline("text-classification", model="MoritzLaurer/deberta-v3-base-mnli")

# Example sentences from Policy 1 & Policy 2
sentence1 = "Employees must wear seat belts at all times."
sentence2 = "Seat belts are not required for employees."

# Predict contradiction, entailment, or neutral
result = nli_model(f"{sentence1} [SEP] {sentence2}")

print(result)  # {'label': 'CONTRADICTION', 'score': 0.98}