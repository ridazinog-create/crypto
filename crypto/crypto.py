from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

ALFABETO = "abcdefghijklmnopqrstuvwxyz"


def deslocar(letra, chave):
    minuscula = letra.lower()
    if minuscula not in ALFABETO:
        return letra
    nova = ALFABETO[(ALFABETO.index(minuscula) + chave) % 26]
    return nova.upper() if letra.isupper() else nova


def processar(texto, chave):
    return "".join(deslocar(letra, chave) for letra in texto)


@app.route("/")
def inicio():
    return render_template("index.html")


@app.route("/processar", methods=["POST"])
def rota_processar():
    dados = request.get_json()
    chave = int(dados["chave"])
    if dados["modo"] == "decifrar":
        chave = -chave
    return jsonify({"resultado": processar(dados["texto"], chave)})


if __name__ == "__main__":
    app.run(debug=False)