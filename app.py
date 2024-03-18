from flask import Flask, redirect, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('about.html')

@app.route('/sir')
def sir():
    return render_template('sir.html')

@app.route('/slit')
def slit():
    return render_template('slit.html')

@app.route('/modellen')
def models():
    return render_template('modellen.html')

@app.route('/tbc-model')
def tbc_model():
    return render_template('tbc-model.html')
