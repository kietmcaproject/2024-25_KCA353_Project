import pandas as pd

from flask import Flask, render_template, request
import pickle
import sys
import numpy as np
# app = Flask(__name__)

pipe = pickle.load(open('C:\\Users\darren\\PycharmProjects\\HousePricePredictor\\RidgeModel.pkl', 'rb'))


data = pd.read_csv('D:\\AUTH-MERN-APP\\backend\python\cleaned_data.csv')
locations = sorted(data['location'].unique())


location = sys.argv[1]
bhk = int(sys.argv[2])
sqft = float(sys.argv[3])
bath = bhk
# bhk_avg_area = data.groupby('bhk')['total_sqft'].mean().sort_index()

    # print(locations, bhk, bath, sqft)
input = pd.DataFrame([[location,sqft,bath,bhk]],columns=['location', 'total_sqft', 'bath', 'bhk'])
prediction = pipe.predict(input)[0] * 1e5

crore = prediction//10000000
remaining = prediction%10000000
lakhs = remaining//100000
thousands = (remaining%100000)//1000

print(str(np.round(prediction,0)))

