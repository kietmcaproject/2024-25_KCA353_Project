# python/get_locations.py
import pandas as pd
import json


# Load the cleaned data CSV

data = pd.read_csv('D:\\AUTH-MERN-APP\\backend\python\cleaned_data.csv')


# Get unique locations
unique_locations = data['location'].unique().tolist()


# Print the unique locations as JSON for easy reading by Node.js
print(json.dumps(unique_locations))
