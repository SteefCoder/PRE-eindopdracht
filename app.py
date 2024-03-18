from flask import Flask, redirect, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/sir')
def sir():
    return render_template('sir.html')

@app.route('/slit')
def slit():
    return render_template('slit.html')

@app.route('/about')
def about():
    return render_template('about.html')